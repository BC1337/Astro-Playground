// generateToken.js

import jwt from 'jsonwebtoken';

export function generateToken(payload, expiresIn = '1h') {
  const secretKey = process.env.JWT_SECRET

  // Check if payload is provided
  if (!payload) {
    throw new Error('Payload is required');
  }

  // Generate the token
  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
}
