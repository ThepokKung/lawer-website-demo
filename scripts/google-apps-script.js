/**
 * Montclaire & Sterling Legal Counsel
 * Google Apps Script - Automated Google Sheets Logging & Email Notification
 * 
 * Instructions:
 * 1. Create a new Google Sheet (e.g. "Montclaire & Sterling - Client Leads")
 * 2. In the Google Sheet menu, click: Extensions > Apps Script
 * 3. Delete any default code and paste this entire file
 * 4. Change RECIPIENT_EMAIL to your destination email address
 * 5. Click "Deploy" (การทำให้ใช้งานได้) > "New deployment" (การทำให้ใช้งานได้รายการใหม่)
 * 6. Select type: "Web app" (เว็บแอป)
 * 7. Set:
 *    - Description: "Law Firm Form Webhook"
 *    - Execute as: "Me" (ฉัน)
 *    - Who has access: "Anyone" (ทุกคน) **IMPORTANT**
 * 8. Click "Deploy", authorize permissions, and copy the "Web app URL"
 * 9. Paste that URL into your `.env` as:
 *    PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXX/exec
 */

// === CONFIGURATION ===
const RECIPIENT_EMAIL = "contact@ms-legal.example.com"; // Change to your actual email (e.g. yourname@gmail.com)
const EMAIL_SUBJECT_PREFIX = "[M&S Legal Lead] คำขอนัดปรึกษากฎหมายใหม่:";

function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000); // Wait up to 10 seconds to avoid race conditions

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // 1. Setup headers if first time
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "วันเวลา (Timestamp)",
        "ชื่อ-นามสกุล (Name)",
        "อีเมล (Email)",
        "เบอร์โทรศัพท์ (Phone)",
        "บริการที่สนใจ (Service)",
        "รายละเอียดข้อเท็จจริง (Message)",
        "ภาษา (Lang)",
        "สถานะการติดตาม (Status)"
      ]);

      // Format header row with royal navy and bold text
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#0B1B3D");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // 2. Parse incoming payload
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    const timestamp = new Date();
    const formattedDate = Utilities.formatDate(timestamp, "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss");
    const name = data.name || "-";
    const email = data.email || "-";
    const phone = data.phone || "-";
    const service = data.service || "General Inquiry";
    const message = data.message || "-";
    const lang = (data.lang || "th").toUpperCase();
    const status = "รอดำเนินการ (New Lead)";

    // 3. Append row into Google Sheet
    sheet.appendRow([
      formattedDate,
      name,
      email,
      phone,
      service,
      message,
      lang,
      status
    ]);

    // 4. Send Instant Email Notification
    sendEmailNotification({
      formattedDate,
      name,
      email,
      phone,
      service,
      message,
      lang
    });

    lock.releaseLock();

    return ContentService.createTextOutput(
      JSON.stringify({ status: "success", message: "Lead recorded and email sent successfully" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(lead) {
  if (!RECIPIENT_EMAIL || RECIPIENT_EMAIL.includes("example.com")) {
    // If not set, don't throw error so sheet appending still works
    return;
  }

  const subject = `${EMAIL_SUBJECT_PREFIX} ${lead.name} (${lead.service})`;

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 4px; overflow: hidden;">
      <div style="background-color: #0B1B3D; padding: 24px; text-align: center; border-bottom: 2px solid #B38E46;">
        <h1 style="color: #FFFFFF; margin: 0; font-size: 20px; letter-spacing: 1px; font-weight: 800;">MONTCLAIRE & STERLING</h1>
        <p style="color: #D5B76C; margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px;">LEGAL COUNSEL • NEW CLIENT INQUIRY</p>
      </div>

      <div style="padding: 28px 24px; background-color: #FFFFFF;">
        <div style="background-color: #FEF9EE; border-left: 4px solid #B38E46; padding: 12px 16px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 13px; color: #78350F; font-weight: bold;">
            🔔 มีผู้สนใจส่งคำขอนัดปรึกษากฎหมายใหม่เข้ามาผ่านเว็บไซต์
          </p>
          <p style="margin: 4px 0 0 0; font-size: 11px; color: #92400E;">
            วันเวลา: ${lead.formattedDate} (ภาษาหน้าเว็บ: ${lead.lang})
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; color: #64748B; width: 140px; font-weight: bold;">ชื่อ-นามสกุล:</td>
            <td style="padding: 10px 0; color: #0F172A; font-weight: 600;">${lead.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: bold;">เบอร์โทรศัพท์:</td>
            <td style="padding: 10px 0; color: #0F172A;"><a href="tel:${lead.phone}" style="color: #0B1B3D; font-weight: 600; text-decoration: none;">📞 ${lead.phone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: bold;">อีเมล:</td>
            <td style="padding: 10px 0; color: #0F172A;"><a href="mailto:${lead.email}" style="color: #0B1B3D; font-weight: 600; text-decoration: none;">✉️ ${lead.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #F1F5F9;">
            <td style="padding: 10px 0; color: #64748B; font-weight: bold;">บริการที่ต้องการ:</td>
            <td style="padding: 10px 0; color: #B38E46; font-weight: bold;">⚖️ ${lead.service}</td>
          </tr>
        </table>

        <div style="margin-top: 20px;">
          <p style="color: #64748B; font-weight: bold; font-size: 13px; margin: 0 0 8px 0;">รายละเอียดข้อเท็จจริงเบื้องต้น:</p>
          <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 4px; padding: 14px; color: #334155; font-size: 13px; line-height: 1.6; white-space: pre-wrap;">${lead.message}</div>
        </div>

        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center;">
          <a href="mailto:${lead.email}?subject=Re: คำขอนัดปรึกษากฎหมาย - Montclaire %26 Sterling Legal" style="display: inline-block; padding: 12px 24px; background-color: #0B1B3D; color: #FFFFFF; text-decoration: none; border-radius: 2px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-right: 8px;">
            ตอบกลับทางอีเมล
          </a>
          <a href="tel:${lead.phone}" style="display: inline-block; padding: 12px 24px; background-color: #FFFFFF; color: #0B1B3D; border: 1px solid #CBD5E1; text-decoration: none; border-radius: 2px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">
            โทรติดต่อลูกค้า
          </a>
        </div>
      </div>

      <div style="padding: 16px; background-color: #F1F5F9; text-align: center; font-size: 11px; color: #64748B; border-top: 1px solid #E2E8F0;">
        Montclaire & Sterling Legal Counsel • Sathorn Square Tower 28th Floor, Bangkok<br/>
        This notification was generated automatically by the web intake system.
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    replyTo: lead.email,
    subject: subject,
    htmlBody: htmlBody
  });
}
