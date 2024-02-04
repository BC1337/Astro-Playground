// userController.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

export { getUserInfo };
