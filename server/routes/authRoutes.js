// authRoutes.js

import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import { getUserInfo, updateUser, uploadAvatar, changePassword } from '../controllers/userController.js';
import { initiatePasswordReset, resetPassword } from '../controllers/resetPasswordController.js';
import { createWorkoutEvent, getWorkoutEvents } from '../controllers/workoutEventController.js'; // Import controller methods
import authenticateToken from '../middleware/authMiddleware.js';
import sendResetEmail from '../utils/sendResetEmail.js';
import sseManager from '../utils/sseManager.js';

const router = express.Router();

// Authentication routes
router.post('/signup', signUp);
router.post('/login', login);

// Protected routes for user information
router.get('/user', authenticateToken, getUserInfo);
router.put('/user', authenticateToken, updateUser);
router.put('/user/avatar', authenticateToken, uploadAvatar);
router.put('/user/password', authenticateToken, changePassword);

// SSE endpoint
router.get('/sse', (req, res) => {
    sseManager.addConnection(res);
  
    req.on('close', () => {
      sseManager.removeConnection(res);
    });
});

// Password reset routes
router.post('/reset-password', initiatePasswordReset);
router.post('/reset-password/:token', resetPassword);

// Route for creating workout event
router.post('/workout-events', authenticateToken, createWorkoutEvent);

// Route for fetching workout events
router.get('/workout-events', authenticateToken, getWorkoutEvents);



export default router;
