import * as postmark from "postmark";

const SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN;

if (!SERVER_TOKEN) {
  console.warn(
    "Postmark Server Token is missing in environment variables. Email sending will be skipped."
  );
}

const client = SERVER_TOKEN ? new postmark.ServerClient(SERVER_TOKEN) : null;

interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  htmlBody: string;
  attachmentName: string;
  buffer: Buffer; // PDF em memória
}

export async function sendReportEmail(
  options: EmailOptions
): Promise<postmark.Models.MessageSendingResponse> {
  if (!client) {
    throw new Error("Postmark client is not initialized. Check Server Token.");
  }

  try {
    const attachmentContent = options.buffer.toString("base64");

    const response = await client.sendEmail({
      From: options.from,
      To: options.to,
      Subject: options.subject,
      HtmlBody: options.htmlBody,
      Attachments: [
        {
          Name: options.attachmentName,
          Content: attachmentContent,
          ContentType: "application/pdf",
        },
      ],
      MessageStream: "outbound", // Ajuste conforme necessário no seu Postmark
    });

    console.log(
      `✅ Email enviado para ${options.to}. MessageID: ${response.MessageID}`
    );
    return response;
  } catch (error: any) {
    console.error(`❌ Erro ao enviar e-mail para ${options.to}:`, error);
    throw new Error(`Erro ao enviar e-mail: ${error.message}`);
  }
}
