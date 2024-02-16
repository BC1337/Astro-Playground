// authRoutes.js

import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import { getUserInfo, updateUser } from '../controllers/userController.js';
import { initiatePasswordReset, resetPassword } from '../controllers/resetPasswordController.js'; // Import controller methods for password reset
import authenticateToken from '../middleware/authMiddleware.js'; // Import your authentication middleware
import sendResetEmail from '../utils/sendResetEmail.js'; // Import sendResetEmail function

const router = express.Router();

// Authentication routes
router.post('/signup', signUp);
router.post('/login', login);

// Protected routes for user information
router.get('/user', authenticateToken, getUserInfo); // Get user information
router.put('/user', authenticateToken, updateUser); // Update user information

// Password reset routes
router.post('/reset-password', initiatePasswordReset); // Initiate password reset process
router.post('/reset-password/:token', resetPassword); // Route for handling password reset confirmation


export default router;
