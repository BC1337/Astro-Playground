import nodemailer from 'nodemailer';

// Modified function with changes highlighted
async function sendResetEmail(email, token) {
  try {
    // Create a Nodemailer transporter with your SMTP configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      service: 'Gmail', // Use the Gmail service
      auth: {
        user: process.env.MAIL, // Your Gmail email address
        pass: process.env.MAIL_PASS, // Your Gmail password or app password if 2FA is enabled
      },
    });

    // Email data
    const mailOptions = {
      from: process.env.MAIL, // Sender email address
      to: email, // Recipient email address
      subject: 'Password Reset Request', // Subject of the email
      text: `To reset your password, click on the following link: http://localhost:4321/reset-password?token=${token}`, // Body of the email
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log(`Password reset email sent to ${email}`);
    return token; // Return the token for further processing if needed
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}

export default sendResetEmail;
