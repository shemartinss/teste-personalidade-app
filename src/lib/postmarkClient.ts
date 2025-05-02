import * as postmark from "postmark";
import fs from "fs";
import path from "path";

const SERVER_TOKEN = process.env.POSTMARK_SERVER_TOKEN;

if (!SERVER_TOKEN) {
  console.warn(
    "Postmark Server Token is missing in environment variables. Email sending will be skipped."
  );
}

// Initialize Postmark client
const client = SERVER_TOKEN ? new postmark.ServerClient(SERVER_TOKEN) : null;

interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  htmlBody: string;
  attachmentName: string;
  buffer: Buffer;
}

// Function to send email with PDF attachment via Postmark
export async function sendReportEmail(
  options: EmailOptions
): Promise<postmark.Models.MessageSendingResponse> {
  if (!client) {
    throw new Error("Postmark client is not initialized. Check Server Token.");
  }

  try {
    // Read the PDF file content
    const attachmentContent = fs
      .readFileSync(options.attachmentPath)
      .toString("base64");
    const attachmentName =
      options.attachmentName || path.basename(options.attachmentPath);

    // Send the email
    const response = await client.sendEmail({
      From: options.from,
      To: options.to,
      Subject: options.subject,
      HtmlBody: options.htmlBody,
      Attachments: [
        {
          Name: attachmentName,
          Content: attachmentContent,
          ContentType: "application/pdf",
        },
      ],
      MessageStream: "outbound", // Or 'transactional' if you have specific streams configured
    });

    console.log(
      `Email sent successfully to ${options.to} via Postmark. MessageID: ${response.MessageID}`
    );
    return response;
  } catch (error: any) {
    console.error(`Error sending email via Postmark to ${options.to}:`, error);
    // Postmark errors often have more details in error.response.data or similar
    if (error.response && error.response.data) {
      console.error("Postmark API Error Details:", error.response.data);
    }
    throw new Error(`Failed to send email via Postmark: ${error.message}`);
  }
}
