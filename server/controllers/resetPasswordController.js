// passwordResetController.js

import { PrismaClient } from '@prisma/client';
import sendResetEmail from '../utils/sendResetEmail.js';
import { v4 as uuidv4 } from 'uuid';
import { generateToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function resetPassword(req, res) {
  const { email } = req.body; // Extract email from the request body

  try {
    // Check if the user with the provided email exists
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique reset token using the email
    const resetToken = generateToken({ email });

    // Set expiration time for the reset token (e.g., 1 hour)
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 1); // 1 hour from now

    // Save the reset token and expiration time in the database
    await prisma.passwordReset.create({
      data: {
        email,
        token: resetToken,
        expiresAt: expirationTime,
      },
    });

    // Send email with password reset link
    await sendResetEmail(email, resetToken);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error handling password reset:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function verifyToken(req, res) {
  const token = req.params.token;

  console.log('Token received from frontend:', token); // Log the token

  try {
    // Check if the token exists in the database and if it's not expired
    const passwordReset = await prisma.passwordReset.findUnique({
      where: {
        token,
      },
    });

    if (!passwordReset || new Date() > passwordReset.expiresAt) {
      // Token not found or expired
      console.error('Token not found or expired:', token);
      return res.status(404).json({ message: 'Token not found or expired' });
    }

    // Token is valid, respond with success
    res.status(200).json({ message: 'Token is valid' });
  } catch (error) {
    console.error('Error verifying password reset token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



async function updatePassword(req, res) {
  console.log('Updating password...');

  const { token, newPassword } = req.body;

  console.log('Token received from frontend:', token); // Log the token
  console.log('New password received from frontend:', newPassword); // Log the new password

  try {
    // Check if the token is provided
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Decode the token to extract the email
    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.email) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const email = decodedToken.email;

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: newPassword,
      },
    });

    // Delete the password reset entry from the database since it's no longer needed
    await prisma.passwordReset.delete({
      where: {
        token: token,
      },
    });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { resetPassword, verifyToken, updatePassword };
