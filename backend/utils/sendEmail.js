import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const escapeHtml = (value = '') => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

const truncateText = (value = '', limit = 200) => {
  const trimmed = String(value).trim();
  return trimmed.length > limit ? `${trimmed.slice(0, limit)}...` : trimmed;
};

const buildThankYouHtml = ({ name, subject, message }) => {
  const safeName = escapeHtml(name);
  const safeSubject = escapeHtml(subject || 'No subject');
  const safeSnippet = escapeHtml(truncateText(message, 200));

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #334155; background: #f8fafc; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00d4ff, #7b2ff7); color: white; padding: 24px; border-radius: 16px; margin-bottom: 20px; }
        .content { background: white; padding: 24px; border-radius: 16px; line-height: 1.7; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08); }
        .summary { background: #f8fafc; padding: 16px; border-left: 4px solid #00d4ff; margin: 20px 0; border-radius: 10px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
        .link { color: #0891b2; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Reaching Out!</h1>
        </div>
        <div class="content">
          <p>Hi <strong>${safeName}</strong>,</p>
          <p>Thank you for getting in touch. I have received your message and will review it carefully.</p>

          <div class="summary">
            <strong>Subject:</strong> ${safeSubject}<br>
            <strong>Message:</strong> ${safeSnippet || 'No message preview available'}
          </div>

          <p>I will get back to you as soon as possible, usually within 24 to 48 hours.</p>

          <p>Meanwhile, you can also connect with me here:</p>
          <ul>
            <li><a href="https://github.com/PranshulCSE" class="link">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/pranshul-threja-4a278237a" class="link">LinkedIn</a></li>
            <li><a href="https://leetcode.com/Pranshul_Threja" class="link">LeetCode</a></li>
          </ul>

          <p>Best regards,<br><strong>Pranshul Threja</strong></p>
        </div>
        <div class="footer">
          <p>This is an automated response. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const buildNotificationHtml = ({ name, email, subject, message }) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || 'No subject');
  const safeMessage = escapeHtml(String(message || '').replace(/\n/g, '\n'));

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #334155; background: #f8fafc; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00d4ff, #7b2ff7); color: white; padding: 24px; border-radius: 16px; margin-bottom: 20px; }
        .content { background: white; padding: 24px; border-radius: 16px; line-height: 1.7; box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08); }
        .message-box { background: #f8fafc; padding: 16px; border: 1px solid #e2e8f0; border-radius: 10px; white-space: pre-wrap; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <p><strong>Message:</strong></p>
          <div class="message-box">${safeMessage}</div>
          <p><strong>Received at:</strong> ${new Date().toLocaleString()}</p>
        </div>
        <div class="footer">
          <p>This is an automated notification.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Reusable pooled transporter avoids reconnecting for every submission.
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  pool: true,
  maxConnections: 2,
  maxMessages: 50,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

export const sendContactEmails = async ({ name, email, subject, message }) => {
  const [thankYouResult, notificationResult] = await Promise.allSettled([
    sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}! - Pranshul Threja`,
      html: buildThankYouHtml({ name, subject, message }),
    }),
    sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Form: ${subject || 'Inquiry'} from ${name}`,
      html: buildNotificationHtml({ name, email, subject, message }),
    }),
  ]);

  return {
    thankYouResult,
    notificationResult,
  };
};

export const sendThankYouEmail = async ({ name, email, subject, message }) => {
  try {
    await sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}! - Pranshul Threja`,
      html: buildThankYouHtml({ name, subject, message }),
    });

    console.log(`✓ Thank you email sent to ${email}`);
  } catch (error) {
    console.error('Error sending thank you email (non-blocking):', error.message);
    return;
  }
};

export const sendNotificationEmail = async ({ name, email, subject, message }) => {
  try {
    await sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Form: ${subject || 'Inquiry'} from ${name}`,
      html: buildNotificationHtml({ name, email, subject, message }),
    });

    console.log(`✓ Notification email sent to ${process.env.OWNER_EMAIL}`);
  } catch (error) {
    console.error('Error sending notification email (non-blocking):', error.message);
    return;
  }
};
