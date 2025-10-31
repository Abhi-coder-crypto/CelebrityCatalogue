import nodemailer from 'nodemailer';
import type { Enquiry } from '@shared/schema';

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const notificationEmail = process.env.NOTIFICATION_EMAIL;

    if (!gmailAppPassword || !notificationEmail) {
      console.warn('Email service not configured: Missing GMAIL_APP_PASSWORD or NOTIFICATION_EMAIL');
      return;
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: notificationEmail,
        pass: gmailAppPassword,
      },
    });

    this.transporter.verify((error) => {
      if (error) {
        console.error('Email service verification failed:', error);
        this.transporter = null;
      } else {
        console.log('✓ Email service is ready to send notifications');
      }
    });
  }

  async sendEnquiryNotification(enquiry: Enquiry): Promise<void> {
    if (!this.transporter) {
      console.warn('Email service not available, skipping notification');
      return;
    }

    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (!notificationEmail) {
      console.warn('NOTIFICATION_EMAIL not set, skipping notification');
      return;
    }

    const mailOptions = {
      from: notificationEmail,
      to: notificationEmail,
      subject: `New Enquiry for ${enquiry.celebrityName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Celebrity Booking Enquiry
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4CAF50; margin-top: 0;">Celebrity Information</h3>
            <p><strong>Name:</strong> ${enquiry.celebrityName}</p>
            <p><strong>ID:</strong> ${enquiry.celebrityId}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4CAF50; margin-top: 0;">Customer Details</h3>
            <p><strong>Name:</strong> ${enquiry.userName}</p>
            <p><strong>Email:</strong> <a href="mailto:${enquiry.email}">${enquiry.email}</a></p>
            <p><strong>Contact:</strong> ${enquiry.contact}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #4CAF50; margin-top: 0;">Enquiry Purpose</h3>
            <p style="white-space: pre-wrap;">${enquiry.purpose}</p>
          </div>

          <div style="color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Enquiry received at: ${new Date(enquiry.createdAt).toLocaleString()}</p>
            <p>Enquiry ID: ${enquiry.id}</p>
          </div>
        </div>
      `,
      text: `
New Celebrity Booking Enquiry

Celebrity: ${enquiry.celebrityName} (${enquiry.celebrityId})

Customer Details:
- Name: ${enquiry.userName}
- Email: ${enquiry.email}
- Contact: ${enquiry.contact}

Purpose:
${enquiry.purpose}

Enquiry ID: ${enquiry.id}
Received at: ${new Date(enquiry.createdAt).toLocaleString()}
      `.trim(),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✓ Email notification sent for enquiry ${enquiry.id}`);
    } catch (error) {
      console.error('Failed to send email notification:', error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
