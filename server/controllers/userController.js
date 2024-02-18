// userController.js

import { PrismaClient } from '@prisma/client';
import upload from '../utils/multerConfig.js';
import multer from 'multer';

const prisma = new PrismaClient();

// Controller method to handle updating user information
async function updateUser(req, res) {
  const userId = req.user.userId; // Extract userId from the authenticated user

  try {
    const { username, name, email, avatar } = req.body; // Extract updated user information from request body

    // Update the user information in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Update the user based on userId
      data: { username, name, email, avatar } // New user information
    });

    res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ message: 'Failed to update user information. Please try again.' });
  }
}

// Controller method to fetch user information including avatar
async function getUserInfo(req, res) {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, username: true, name: true, email: true, avatar: true } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function uploadAvatar(req, res) {
  try {
    upload.single('avatar')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during file upload
        console.error('Multer error:', err);
        return res.status(500).json({ message: 'Failed to upload avatar. Please try again.' });
      } else if (err) {
        // An unknown error occurred
        console.error('Unknown error:', err);
        return res.status(500).json({ message: 'An error occurred. Please try again.' });
      }

      // File upload was successful
      const avatarPath = req.file.path; // Get the path of the uploaded avatar image
      const userId = req.user.userId; // Extract userId from the authenticated user

      // Update user's avatar URL in the database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { avatar: avatarPath }, // Update avatar path in the database
      });

      res.status(200).json({ message: 'Avatar updated successfully', user: updatedUser });
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ message: 'Failed to upload avatar. Please try again.' });
  }
}

export { getUserInfo, updateUser, uploadAvatar};