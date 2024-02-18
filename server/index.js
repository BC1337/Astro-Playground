import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import dotenv from 'dotenv'; 

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import upload from './utils/multerConfig.js'; // Import multer middleware

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the "images" directory
app.use('/images', express.static(path.join(__dirname,'images')));

// Routes
app.use('/api/auth', authRoutes);

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
