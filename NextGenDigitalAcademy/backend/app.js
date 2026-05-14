import express from 'express';
import cors from 'cors';
import { contactRoutes } from './routes/contactRoutes.js';
import { enrollmentRoutes } from './routes/enrollmentRoutes.js';
import { authRoutes } from './routes/authRoutes.js';
import { adminRoutes } from './routes/adminRoutes.js';
import { courseRoutes } from './routes/courseRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/contact', contactRoutes);
app.use('/api/enroll', enrollmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);

app.use((err, req, res, _next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
