// authMiddleware.js

import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  console.log('Token:', token); // Log the token

  // Exclude reset password endpoint from token verification
  if (req.path === '/api/auth/reset-password') {
    console.log('Reset password endpoint hit');
    return next(); // Allow access without token verification
  }

  if (!token) {
    console.log('Missing token');
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Invalid token');
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

export default authenticateToken;
