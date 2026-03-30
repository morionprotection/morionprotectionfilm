import nodemailer from "nodemailer";

/* =========================
   SMTP TRANSPORTER
========================= */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* =========================
   SEND WARRANTY EMAIL
========================= */
export async function sendWarrantyStatusEmail({
  to,
  name,
  shop,
  status,
  invoiceUrl,
  vehicleInfo = "", // Optional: e.g., "2024 BMW X5"
}) {
  const isApproved = status === "approved";
  const isRejected = status === "rejected";
  const date = new Date().toLocaleDateString("en-GB");

  // --- Dynamic Styling & Text ---
  let subject = "Update regarding your Warranty Application";
  let statusColor = "#f59e0b"; // Amber (Pending/Default)
  let statusTitle = "Status Update";
  let statusMessage = "Your warranty application status has changed.";

  if (isApproved) {
    subject = "✔ Warranty Approved – MORION";
    statusColor = "#10b981"; // Emerald Green
    statusTitle = "APPLICATION APPROVED";
    statusMessage = `We are pleased to inform you that your warranty application submitted via <strong>${shop}</strong> has been officially approved.`;
  } else if (isRejected) {
    subject = "Update regarding your Warranty – MORION";
    statusColor = "#ef4444"; // Red
    statusTitle = "APPLICATION REJECTED";
    statusMessage = `Regarding your warranty application submitted via <strong>${shop}</strong>. After review, we regret to inform you that the application could not be accepted at this time.`;
  }

  // --- HTML TEMPLATE ---
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 0;">
        <tr>
          <td align="center">
            
            <table role="presentation" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 0px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
              
              <tr>
                <td style="padding: 40px 40px 20px 40px; background-color: #000000; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 24px; letter-spacing: 4px; font-weight: 300;">MORION</h1>
                  <p style="margin: 5px 0 0 0; color: #a1a1aa; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">Paint Protection Films</p>
                </td>
              </tr>

              <tr>
                <td height="6" style="background-color: ${statusColor};"></td>
              </tr>

              <tr>
                <td style="padding: 40px;">
                  
                  <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; color: ${statusColor}; text-transform: uppercase; letter-spacing: 1px;">
                    ${statusTitle}
                  </p>

                  <h2 style="margin: 0 0 25px 0; font-size: 22px; color: #18181b; font-weight: 400; line-height: 1.4;">
                    Hello ${name},
                  </h2>

                  <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #52525b;">
                    ${statusMessage}
                  </p>

                  ${
                    vehicleInfo
                      ? `<p style="margin: 0 0 20px 0; font-size: 14px; color: #71717a; background: #f4f4f5; padding: 10px; border-left: 3px solid #d4d4d8;">
                          <strong>Vehicle:</strong> ${vehicleInfo}
                         </p>`
                      : ""
                  }

                  ${
                    invoiceUrl && isApproved
                      ? `
                      <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px; margin-bottom: 30px;">
                        <tr>
                          <td align="center" style="border-radius: 0px; background-color: #000000;">
                            <a href="${invoiceUrl}" target="_blank" style="font-size: 14px; font-family: sans-serif; font-weight: bold; color: #ffffff; text-decoration: none; padding: 14px 28px; border: 1px solid #000000; display: inline-block; text-transform: uppercase; letter-spacing: 1px;">
                              Download Invoice &rarr;
                            </a>
                          </td>
                        </tr>
                      </table>
                      `
                      : ""
                  }

                  <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; color: #52525b;">
                    Thank you for choosing Morion.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="background-color: #fcfcfc; padding: 30px 40px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.5;">
                    <strong>Date:</strong> ${date} <br>
                    <strong>Reference:</strong> via ${shop}
                  </p>
                  <p style="margin: 20px 0 0 0; font-size: 11px; color: #d4d4d8; text-transform: uppercase;">
                    &copy; ${new Date().getFullYear()} Morion PPF Systems. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
            </td>
        </tr>
      </table>

    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"MORION System" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}