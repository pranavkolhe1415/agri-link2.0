import nodemailer from 'nodemailer';
export async function sendOtpEmail(email, otp) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    if (process.env.NODE_ENV !== 'production') { console.log(`[DEV OTP] ${email}: ${otp}`); return; }
    throw new Error('Email OTP is not configured. Configure SMTP before production use.');
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM, to: email, subject: 'Your AgriLink verification code',
    text: `Your AgriLink verification code is ${otp}. It expires in ${process.env.OTP_EXPIRES_MINUTES || 5} minutes.`
  });
}
