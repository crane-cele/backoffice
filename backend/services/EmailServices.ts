import nodemailer from 'nodemailer';
import { config } from '../config/config';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  const url = `http://${process.env.HOST}/api/auth/confirm/${token}`;
  const mailOptions = {
    to: email,
    subject: 'Confirm Email',
    html: `Click <a href="${url}">here</a> to confirm your email.`,
  };
  await transporter.sendMail(mailOptions);
};
