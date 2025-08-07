const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:5000/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Authentication" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Verify your email address',
    html: `
      <h2>Welcome to Mern Auth 👋</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}" target="_blank">${verificationLink}</a>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
    throw err;
  }
};

module.exports = sendVerificationEmail;
