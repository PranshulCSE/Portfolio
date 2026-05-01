import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password, not regular password
  },
});

export const sendThankYouEmail = async ({ name, email, subject, message }) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #00d4ff, #7b2ff7); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border-radius: 8px; line-height: 1.6; }
          .summary { background: #f0f0f0; padding: 15px; border-left: 4px solid #00d4ff; margin: 20px 0; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666; }
          .link { color: #00d4ff; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Reaching Out! 👋</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for getting in touch! I've received your message and really appreciate you taking the time to reach out.</p>
            
            <div class="summary">
              <strong>Here's what I received:</strong><br><br>
              <strong>Subject:</strong> ${subject || 'No subject'}<br>
              <strong>Message:</strong> ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
            </div>
            
            <p>I'll review your message carefully and get back to you as soon as possible—typically within 24-48 hours.</p>
            
            <p>In the meantime, feel free to explore my work and connect with me on other platforms:</p>
            <ul>
              <li><a href="https://github.com/PranshulCSE" class="link">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/pranshul-threja-4a278237a" class="link">LinkedIn</a></li>
              <li><a href="https://leetcode.com/Pranshul_Threja" class="link">LeetCode</a></li>
            </ul>
            
            <p>Best regards,<br>
            <strong>Pranshul Threja</strong><br>
            MCA Student | MERN Stack Developer<br>
            📧 threjapranshul@gmail.com<br>
            📱 +91 9992560407</p>
          </div>
          <div class="footer">
            <p>This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Thanks for reaching out, ${name}! 👋 — Pranshul Threja`,
      html: htmlContent,
    });

    console.log(`✓ Thank you email sent to ${email}`);
  } catch (error) {
    console.error('Error sending thank you email (non-blocking):', error.message);
    // Do not throw — keep email failures non-blocking so form submission succeeds
    return;
  }
};

export const sendNotificationEmail = async ({ name, email, subject, message }) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #00d4ff, #7b2ff7); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .content { background: white; padding: 20px; border-radius: 8px; line-height: 1.6; }
          .message-box { background: #f9f9f9; padding: 15px; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0; }
          .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <h2>Contact Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
            
            <h3>Message:</h3>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <p><strong>Received at:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <div class="footer">
            <p>This is an automated notification. Check your contact management system for details.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: `New Contact Form: ${subject || 'Inquiry'} from ${name}`,
      html: htmlContent,
    });

    console.log(`✓ Notification email sent to ${process.env.OWNER_EMAIL}`);
  } catch (error) {
    console.error('Error sending notification email (non-blocking):', error.message);
    // Do not throw — keep email failures non-blocking so form submission succeeds
    return;
  }
};
