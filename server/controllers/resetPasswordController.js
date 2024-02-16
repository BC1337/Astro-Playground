import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/bcryptUtils.js'; // Import the hashPassword function
import sendResetEmail from '../utils/sendResetEmail.js'; // Import the sendResetEmail function

const prisma = new PrismaClient();

// Function to generate JWT token
function generateToken(payload, expiresIn = '1h') {
  const secretKey = process.env.JWT_SECRET;
  if (!payload) {
    throw new Error('Payload is required');
  }
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
}

async function initiatePasswordReset(req, res) {
  const { email } = req.body;

  try {
    console.log('Initiating password reset for email:', email);

    // Check if the user with the provided email exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a JWT token with the user's email
    const token = generateToken({ email });
    console.log('Generated token:', token);

    // Send the password reset email with the token
    await sendResetEmail(email, token);
    console.log('Password reset email sent successfully');

    // Return a success response
    return res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error initiating password reset:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function resetPassword(req, res) {
  const { email, newPassword, token } = req.body;

  try {
    console.log('Resetting password for email:', email);

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Check if the decoded email matches the request email
    if (decoded.email !== email) {
      console.log('Invalid token for the provided email');
      return res.status(400).json({ message: 'Invalid token for the provided email' });
    }

    // Hash the new password before storing it
    const hashedPassword = await hashPassword(newPassword);

    // Proceed with the password reset process
    await prisma.user.update({
      where: { email: decoded.email },
      data: { password: hashedPassword }, // Store the hashed password in the database
    });

    console.log('Password reset successful');

    // Inform the user that the password reset was successful
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export { initiatePasswordReset, resetPassword };
