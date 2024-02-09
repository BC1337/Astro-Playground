// passwordResetController.js

import { PrismaClient } from '@prisma/client';
import sendResetEmail from '../utils/sendResetEmail.js';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function resetPassword(req, res) {
  const { email } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a unique reset token using uuid
    const resetToken = uuidv4();

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
  
    try {
      // Check if the token exists in the database and if it's not expired
      const passwordReset = await prisma.passwordReset.findUnique({
        where: {
          token,
        },
      });
  
      if (!passwordReset || new Date() > passwordReset.expiresAt) {
        // Token not found or expired
        return res.status(404).json({ message: 'Token not found or expired' });
      }
  
      // Render the password reset form
      res.render('password-reset-form', { token }); // You need to create this view/template
    } catch (error) {
      console.error('Error verifying password reset token:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

export { resetPassword, verifyToken, updatePassword };
