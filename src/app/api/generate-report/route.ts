import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { calculateDomainScores } from "@/lib/scoreCalculator";
import { syncActiveCampaignContact } from "@/lib/activeCampaignClient";
import { sendReportEmail } from "@/lib/postmarkClient";
import { exec } from "child_process";
import path from "path";
import fs from "fs/promises";
import { promisify } from "util";

const execPromise = promisify(exec);

interface Answer {
  question_id: string;
  score: number;
  domain: string;
  facet: number;
  keyed: string;
  lead_id: string | null;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

const FROM_EMAIL = "contato@sheilamartins.com";

export async function POST(req: NextRequest) {
  let outputPdfPath: string | null = null;

  try {
    const { leadId } = await req.json();

    if (!leadId) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .select("id, name, email, phone")
      .eq("id", leadId)
      .single();

    if (leadError || !leadData) {
      console.error("Error fetching lead:", leadError);
      return NextResponse.json(
        { error: "Failed to fetch lead details" },
        { status: 500 }
      );
    }

    try {
      console.log(
        `Attempting to sync contact ${leadData.email} to ActiveCampaign...`
      );
      const acSyncResult = await syncActiveCampaignContact({
        email: leadData.email,
        firstName: leadData.name,
        phone: leadData.phone,
      });
      console.log(
        `ActiveCampaign sync result for ${leadData.email}:`,
        acSyncResult
      );
    } catch (acError: any) {
      console.error(
        `Failed to sync contact ${leadData.email} to ActiveCampaign:`,
        acError.message
      );
    }

    const { data: answersData, error: answersError } = await supabase
      .from("answers")
      .select("*")
      .eq("lead_id", leadId);

    if (answersError || !answersData) {
      console.error("Error fetching answers:", answersError);
      return NextResponse.json(
        { error: "Failed to fetch answers" },
        { status: 500 }
      );
    }

    if (answersData.length < 120) {
      console.warn(`Lead ${leadId} has only ${answersData.length} answers.`);
    }

    const scores = calculateDomainScores(answersData as Answer[]);

    const templatePath = path.resolve(
      process.cwd(),
      "src/lib/report_template.html"
    );
    const tempDir = "/tmp";
    const uniqueFilename = `report_${leadId}_${Date.now()}.pdf`;
    outputPdfPath = path.join(tempDir, uniqueFilename);

    try {
      await fs.access(templatePath);
    } catch {
      console.error(`Template file not found at ${templatePath}`);
      return NextResponse.json(
        { error: "Report template file not found on server." },
        { status: 500 }
      );
    }

    const pythonScriptPath = path.resolve(process.cwd(), "generate_pdf.py");
    const command = `python3 ${pythonScriptPath} \
      --template "${templatePath}" \
      --output "${outputPdfPath}" \
      --name "${leadData.name}" \
      --score_n ${scores.N} \
      --score_e ${scores.E} \
      --score_o ${scores.O} \
      --score_a ${scores.A} \
      --score_c ${scores.C}`;

    console.log(`Executing command: ${command}`);

    try {
      const { stdout, stderr } = await execPromise(command);
      console.log("Python script stdout:", stdout);
      if (stderr) {
        console.error("Python script stderr:", stderr);
        try {
          await fs.access(outputPdfPath);
          console.warn("PDF generated but script produced stderr output.");
        } catch {
          return NextResponse.json(
            {
              error: "Failed to generate PDF report via script.",
              details: stderr,
            },
            { status: 500 }
          );
        }
      }
      await fs.access(outputPdfPath);
      console.log(`PDF generated successfully at ${outputPdfPath}`);
    } catch (error: any) {
      console.error("Error executing Python script:", error);
      return NextResponse.json(
        { error: "Failed to generate PDF report.", details: error.message },
        { status: 500 }
      );
    }

    try {
      const emailTemplatePath = path.resolve(
        process.cwd(),
        "src/lib/email_body.html"
      );
      let htmlBody = await fs.readFile(emailTemplatePath, "utf-8");

      htmlBody = htmlBody.replace(
        /{{ NOME_DO_USUARIO }}/g,
        leadData.name || "Usuário"
      );
      htmlBody = htmlBody.replace(
        /{{ ANO_ATUAL }}/g,
        new Date().getFullYear().toString()
      );

      await sendReportEmail({
        to: leadData.email,
        from: FROM_EMAIL,
        subject: "Seu Relatório de Personalidade Big Five Chegou!",
        htmlBody: htmlBody,
        attachmentPath: outputPdfPath,
        attachmentName: `Relatorio_BigFive_${leadData.name.replace(/\s+/g, "_")}.pdf`,
      });
      console.log(`Successfully initiated email sending to ${leadData.email}`);
    } catch (emailError: any) {
      console.error("Error sending email via Postmark:", emailError);
    }

    return NextResponse.json(
      {
        message:
          "Report generated, AC synced, and email sending initiated successfully.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("🚨 API Error Detalhado:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error?.stack || error?.message || String(error),
      },
      { status: 500 }
    );
  } finally {
    if (outputPdfPath) {
      try {
        await fs.unlink(outputPdfPath);
        console.log(`Temporary PDF file deleted: ${outputPdfPath}`);
      } catch (cleanupError) {
        console.error(
          `Error deleting temporary PDF file ${outputPdfPath}:`,
          cleanupError
        );
      }
    }
  }
}
