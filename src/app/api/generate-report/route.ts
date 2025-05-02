import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { calculateDomainScores } from "@/lib/scoreCalculator";
import { syncActiveCampaignContact } from "@/lib/activeCampaignClient";
import { sendReportEmail } from "@/lib/postmarkClient";
import { pdf } from "@react-pdf/renderer";
import { BigFiveReport } from "@/components/BigFiveReport";
import fs from "fs/promises";
import path from "path";
import React from "react";

const FROM_EMAIL = "contato@sheilamartins.com";

export async function POST(req: NextRequest) {
  try {
    const { leadId } = await req.json();

    if (!leadId) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const { data: leadData, error: leadError } = await supabase
      .from("leads")
      .select("id, name, email, phone")
      .eq("id", leadId)
      .single();

    if (leadError || !leadData) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const { data: answersData, error: answersError } = await supabase
      .from("answers")
      .select("*")
      .eq("lead_id", leadId);

    if (answersError || !answersData || answersData.length < 120) {
      return NextResponse.json({ error: "Respostas insuficientes ou erro ao buscar" }, { status: 400 });
    }

    const scores = calculateDomainScores(answersData);

    // Corrigido: uso de React.createElement para renderizar o componente
    const pdfStream = await pdf(
      React.createElement(BigFiveReport, {
        name: leadData.name,
        scores: scores,
      })
    ).toBuffer();

    const emailTemplatePath = path.resolve(process.cwd(), "src/lib/email_body.html");
    let htmlBody = await fs.readFile(emailTemplatePath, "utf-8");

    htmlBody = htmlBody.replace(/{{ NOME_DO_USUARIO }}/g, leadData.name);
    htmlBody = htmlBody.replace(/{{ ANO_ATUAL }}/g, new Date().getFullYear().toString());

    await sendReportEmail({
      to: leadData.email,
      from: FROM_EMAIL,
      subject: "Seu Relatório de Personalidade Big Five Chegou!",
      htmlBody,
      attachmentPath: "inline",
      attachmentName: `Relatorio_BigFive_${leadData.name.replace(/\s+/g, "_")}.pdf`,
      buffer: pdfStream,
    });

    try {
      await syncActiveCampaignContact({
        email: leadData.email,
        firstName: leadData.name,
        phone: leadData.phone,
      });
    } catch (error) {
      console.error("Erro ao sincronizar com ActiveCampaign:", error);
    }

    return NextResponse.json({ message: "PDF gerado e enviado com sucesso." });
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json({ error: error.message || "Erro interno" }, { status: 500 });
  }
}
