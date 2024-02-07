// sendResetEmail.js

// You can use your preferred email sending library here
// For demonstration purposes, let's assume a simple console log

async function sendResetEmail(email, token) {
    try {
      // You can use your email sending service or provider here
      // For demonstration, we'll just log the email details
      console.log(`Sending password reset email to ${email} with token: ${token}`);
      console.log('Please follow the instructions in the email to reset your password.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  }
  
  export default sendResetEmail;
  