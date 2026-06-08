const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Kidoza" <${process.env.GMAIL_USER}>`,
    to: email,
    subject,
    html: message,
  });

  console.log("SMTP RESULT:", info);

  if (info.rejected.length > 0) {
    throw new Error("Email rejected by Gmail");
  }

  return info;
};

module.exports = sendEmail;