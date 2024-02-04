import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import authenticateToken from '../middleware/authMiddleware.js'; // Import your authentication middleware
import { getUserInfo } from '../controllers/userController.js'; // Import a controller method to get user info

const router = express.Router();

// Authentication routes
router.post('/signup', signUp);
router.post('/login', login);

// Protected route to get user information
router.get('/user', authenticateToken, getUserInfo);

export default router;
