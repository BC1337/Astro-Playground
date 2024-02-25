// userController.js

import { PrismaClient } from '@prisma/client';

import upload from '../utils/multerConfig.js';
import SSEManager from '../utils/sseManager.js';

import multer from 'multer';
import dotenv from 'dotenv'; // Import dotenv
import fs from 'fs';



dotenv.config(); // Load environment variables from .env file

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
      // Error handling for file upload
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(500).json({ message: 'Failed to upload avatar. Please try again.' });
      } else if (err) {
        console.error('Unknown error:', err);
        return res.status(500).json({ message: 'An error occurred. Please try again.' });
      }

      // File upload was successful
      const avatarPath = req.file.path; // Get the path of the uploaded avatar image
      const userId = req.user.userId; // Extract userId from the authenticated user

      try {
        // Fetch the user to check if a previous avatar exists
        const user = await prisma.user.findUnique({ where: { id: userId }, select: { avatar: true } });

        if (user.avatar && user.avatar !== '/images/blankAvatar.webp') {
          // If a previous avatar exists and it's not the default image, delete it from the /images/ folder
          fs.unlink(user.avatar, async (err) => {
            if (err) {
              console.error('Error deleting previous avatar:', err);
            } else {
              console.log('Previous avatar deleted successfully');
            }
          });
        }

        // Update user's avatar URL in the database
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { avatar: avatarPath }, // Update avatar path in the database
        });

        // Broadcast avatar update to connected clients
        const userUpdate = await prisma.user.findUnique({ where: { id: userId } });
        userUpdate.avatar = `http://localhost:3001/${userUpdate.avatar}`; // new test
        console.log('Sending SSE event: avatar-update', JSON.stringify(userUpdate));
        SSEManager.sendEvent('avatar-update', JSON.stringify(userUpdate));

        res.status(200).json({ message: 'Avatar updated successfully', user: updatedUser });
      } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ message: 'Failed to update user information. Please try again.' });
      }
    });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ message: 'Failed to upload avatar. Please try again.' });
  }
}


export { getUserInfo, updateUser, uploadAvatar};