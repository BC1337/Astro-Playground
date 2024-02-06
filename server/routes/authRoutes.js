// authRoutes.js

import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js'; // Import your authentication middleware
import { getUserInfo, updateUser } from '../controllers/userController.js'; // Import controller methods for user info

const router = express.Router();

// Authentication routes
router.post('/signup', signUp);
router.post('/login', login);

// Protected routes for user information
router.get('/user', authenticateToken, getUserInfo); // Get user information
router.put('/user', authenticateToken, updateUser); // Update user information

export default router;
