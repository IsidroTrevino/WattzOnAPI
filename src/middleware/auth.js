import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1] || req.query.token;

  if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user;
    next();
  });
};