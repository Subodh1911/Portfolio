/**
 * Google Apps Script — Contact Form Handler
 *
 * Deploy steps:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this entire file into Code.gs
 * 3. Set RECIPIENT_EMAIL below to your Gmail address
 * 4. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL into script.js CONFIG.APPS_SCRIPT_URL
 */

const RECIPIENT_EMAIL = 'subodhkumar2285@gmail.com';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const name = sanitize(data.name);
    const email = sanitize(data.email);
    const projectType = sanitize(data.projectType);
    const message = sanitize(data.message);

    if (!name || !email || !projectType || !message) {
      return jsonResponse({ success: false, error: 'Missing required fields' });
    }

    const subject = `[Portfolio] ${projectType} — ${name}`;
    const body =
      `New contact form submission\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Project Type: ${projectType}\n\n` +
      `Message:\n${message}\n\n` +
      `---\nSent from portfolio contact form`;

    GmailApp.sendEmail(RECIPIENT_EMAIL, subject, body, {
      replyTo: email,
      name: 'Portfolio Contact Form'
    });

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function doGet() {
  return jsonResponse({ status: 'Contact form endpoint is active' });
}

function sanitize(str) {
  if (!str || typeof str !== 'string') return '';
  return str.trim().substring(0, 5000);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
