import { Router } from 'express';
import { store } from '../store.js';
import { createHash, randomBytes } from 'crypto';

export const authRoutes = Router();

function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

function generateToken() {
  return randomBytes(32).toString('hex');
}

authRoutes.post('/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  const existing = store.getUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }

  const user = store.addUser({
    name,
    email,
    phone,
    password: hashPassword(password)
  });

  res.status(201).json({
    message: 'Account created successfully! You can now sign in.',
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});

authRoutes.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = store.getUserByEmail(email);
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = generateToken();
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });
});
