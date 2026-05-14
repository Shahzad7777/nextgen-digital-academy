import { Router } from 'express';
import { store } from '../store.js';

export const adminRoutes = Router();

adminRoutes.get('/enrollments', (req, res) => {
  const enrollments = store.getEnrollments();
  res.json({ enrollments });
});

adminRoutes.get('/contacts', (req, res) => {
  const contacts = store.getContacts();
  res.json({ contacts });
});

adminRoutes.get('/stats', (req, res) => {
  res.json({
    totalUsers: store.getUsers().length,
    totalEnrollments: store.getEnrollments().length,
    totalContacts: store.getContacts().length
  });
});
