// authRoutes.js

import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import { getUserInfo, updateUser, uploadAvatar, changePassword } from '../controllers/userController.js';
import { initiatePasswordReset, resetPassword } from '../controllers/resetPasswordController.js'; // Import controller methods for password reset
import authenticateToken from '../middleware/authMiddleware.js'; // Import your authentication middleware
import sendResetEmail from '../utils/sendResetEmail.js'; // Import sendResetEmail function
import sseManager from '../utils/sseManager.js'; // Import SSE manager

const router = express.Router();

// Authentication routes
router.post('/signup', signUp);
router.post('/login', login);

// Protected routes for user information
router.get('/user', authenticateToken, getUserInfo); // Get user information
router.put('/user', authenticateToken, updateUser); // Update user information
router.put('/user/avatar', authenticateToken, uploadAvatar); // Route for updating user avatar
router.put('/user/password', authenticateToken, changePassword); // Add route for changing password

// SSE endpoint
router.get('/sse', (req, res) => {
    sseManager.addConnection(res);
  
    req.on('close', () => {
      sseManager.removeConnection(res);
    });
  });


// Password reset routes
router.post('/reset-password', initiatePasswordReset); // Initiate password reset process
router.post('/reset-password/:token', resetPassword); // Route for handling password reset confirmation


export default router;
