import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/bcryptUtils.js';

const prisma = new PrismaClient();

async function signUp(req, res) {
  const { name, username, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { signUp };
