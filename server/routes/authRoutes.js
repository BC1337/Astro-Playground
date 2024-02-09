// authRoutes.js

import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import { getUserInfo, updateUser } from '../controllers/userController.js';
import { resetPassword, verifyToken, updatePassword } from '../controllers/resetPasswordController.js'; // Import controller methods for password reset
import authenticateToken from '../middleware/authMiddleware.js'; // Import your authentication middleware

const router = express.Router();

// Authentication routes
router.post('/signup', signUp);
router.post('/login', login);

// Protected routes for user information
router.get('/user', authenticateToken, getUserInfo); // Get user information
router.put('/user', authenticateToken, updateUser); // Update user information

// Password reset routes
router.post('/reset-password', resetPassword); // Initiate password reset process
router.get('/reset-password/:token', verifyToken); // Verify password reset token
router.post('/reset-password/:token', updatePassword); // Update password with valid token

export default router;
