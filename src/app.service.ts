import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import 'dotenv/config';
import { emailConfig } from './config/email.config';

@Injectable()
export class AppService {
  async sendTestEmail(email: string): Promise<{ msg: string }> {
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: false,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
      },
    });
    try {
      const info = await transporter.sendMail({
        from: `"Test Sender" <${emailConfig.user}>`,
        to: email,
        subject: 'Hello from Nest.js ✔',
        text: 'გამარჯობა! ეს არის ტესტური წერილი',
        html: '<h3>გამარჯობა! ეს არის <b>ტესტური წერილი</b></h3>',
      });

      return { msg: `Message sent successfully to ${email}! ID: ${info.messageId}` };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}