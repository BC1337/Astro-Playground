// userController.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Controller method to handle updating user information
async function updateUser(req, res) {
  const userId = req.user.userId; // Extract userId from the authenticated user

  try {
    const { username, name, email } = req.body; // Extract updated user information from request body

    // Update the user information in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId }, // Update the user based on userId
      data: { username, name, email } // New user information
    });

    res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user information:', error);
    res.status(500).json({ message: 'Failed to update user information. Please try again.' });
  }
}

// Controller method to fetch user information
async function getUserInfo(req, res) {
  try {
    const userId = req.user.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { getUserInfo, updateUser };
