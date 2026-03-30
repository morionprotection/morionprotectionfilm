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
   SEND STATUS EMAIL (DEALER)
========================= */
export async function sendStatusEmail({ to, name, shop, status }) {
  const isApproved = status === "approved";
  const date = new Date().toLocaleDateString("en-GB");

  // --- Dynamic Styling & Text ---
  let subject = "Update regarding your Dealer Application";
  let statusColor = "#f59e0b"; // Amber default
  let statusTitle = "APPLICATION UPDATE";
  let statusMessage = "";

  if (isApproved) {
    subject = "✔ Application Approved – Welcome to Morion";
    statusColor = "#10b981"; // Emerald Green
    statusTitle = "PARTNERSHIP APPROVED";
    statusMessage = `We are pleased to officially welcome <strong>${shop}</strong> to the Morion network. Your dealer application has been accepted.`;
  } else {
    subject = "Update regarding your Dealer Application";
    statusColor = "#ef4444"; // Red
    statusTitle = "APPLICATION DECLINED";
    statusMessage = `Thank you for your interest in becoming a Morion dealer. After a thorough review of your application for <strong>${shop}</strong>, we regret to inform you that we cannot proceed with the partnership at this time.`;
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
                  <p style="margin: 5px 0 0 0; color: #a1a1aa; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">Dealer Network</p>
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
                    isApproved
                      ? `
                      <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="margin-top: 30px; margin-bottom: 30px;">
                        <tr>
                          <td align="center" style="border-radius: 0px; background-color: #000000;">
                          </td>
                        </tr>
                      </table>
                      `
                      : ""
                  }

                  <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.6; color: #52525b;">
                    Regards,<br>
                    <strong>The Morion Team</strong>
                  </p>
                </td>
              </tr>

              <tr>
                <td style="background-color: #fcfcfc; padding: 30px 40px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.5;">
                    <strong>Date:</strong> ${date} <br>
                    <strong>Applicant:</strong> ${shop}
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


/* =========================
   SEND QUOTE REQUEST (ADMIN NOTIFICATION)
========================= */
export async function sendQuoteRequestEmail({ firstName, lastName, email, phone, city, vehicle, series }) {
  const fullName = `${firstName} ${lastName}`;
  const date = new Date().toLocaleDateString("en-GB", {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  // --- Styling ---
  const accentColor = "#33b5a8"; // Morion Teal
  const subject = `New Quote Request: ${fullName}`;
  
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
                  <p style="margin: 5px 0 0 0; color: #a1a1aa; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">Web Lead System</p>
                </td>
              </tr>

              <tr>
                <td height="6" style="background-color: ${accentColor};"></td>
              </tr>

              <tr>
                <td style="padding: 40px;">
                  
                  <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: 700; color: ${accentColor}; text-transform: uppercase; letter-spacing: 1px;">
                    New Incoming Lead
                  </p>

                  <h2 style="margin: 0 0 25px 0; font-size: 22px; color: #18181b; font-weight: 400; line-height: 1.4;">
                    Quote Request Received
                  </h2>

                  <p style="margin: 0 0 30px 0; font-size: 15px; line-height: 1.6; color: #52525b;">
                    A new customer has requested a quotation via the website. Please review the details below and contact them shortly.
                  </p>

                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top: 1px solid #f4f4f5;">
                    
                    ${renderRow("Client Name", fullName)}
                    ${renderRow("Email Address", `<a href="mailto:${email}" style="color: #33b5a8; text-decoration: none;">${email}</a>`)}
                    ${renderRow("Phone Number", `<a href="tel:${phone}" style="color: #18181b; text-decoration: none;">${phone}</a>`)}
                    ${renderRow("City / Region", city)}
                    ${renderRow("Vehicle Info", vehicle)}
                    ${renderRow("Preferred Series", series, true)} </table>

                  <div style="margin-top: 30px; padding: 15px; background-color: #f9fafb; border-left: 3px solid ${accentColor};">
                     <p style="margin: 0; font-size: 13px; color: #71717a; font-style: italic;">
                       "Please ensure to respond within 24 hours to maintain lead quality."
                     </p>
                  </div>

                </td>
              </tr>

              <tr>
                <td style="background-color: #fcfcfc; padding: 30px 40px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; font-size: 12px; color: #a1a1aa; line-height: 1.5;">
                    <strong>Timestamp:</strong> ${date} <br>
                    <strong>Source:</strong> Web Quote Form
                  </p>
                  <p style="margin: 20px 0 0 0; font-size: 11px; color: #d4d4d8; text-transform: uppercase;">
                    &copy; ${new Date().getFullYear()} Morion PPF Systems. Internal Notification.
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

  // Send to ADMIN email (You can change process.env.SMTP_USER to a specific receiver email)
  await transporter.sendMail({
    from: `"MORION Web" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, // <--- OR CHANGE THIS TO: "sales@morion.com"
    subject,
    html,
  });
}

// --- Helper function to render table rows cleanly ---
function renderRow(label, value, isHighlight = false) {
  const bg = isHighlight ? 'background-color: #f0fdfa;' : ''; // Very subtle teal bg for highlight
  return `
    <tr>
      <td width="35%" style="padding: 12px 10px; border-bottom: 1px solid #f4f4f5; color: #a1a1aa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; ${bg}">
        ${label}
      </td>
      <td width="65%" style="padding: 12px 10px; border-bottom: 1px solid #f4f4f5; color: #18181b; font-size: 14px; font-weight: 500; text-align: right; ${bg}">
        ${value || '<span style="color:#d4d4d8;">N/A</span>'}
      </td>
    </tr>
  `;
}