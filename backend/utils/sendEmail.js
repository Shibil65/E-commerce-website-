const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  if (!process.env.GMAIL_USER) {
    throw new Error('GMAIL_USER is missing in .env');
  }

  if (!process.env.GMAIL_PASS) {
    throw new Error('GMAIL_PASS is missing in .env');
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,

    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Kidoza Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject,
      html: message,
    });

    console.log('Email sent successfully');
    console.log('Message ID:', info.messageId);

    return info;
  } catch (error) {
    console.error('Email Error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;