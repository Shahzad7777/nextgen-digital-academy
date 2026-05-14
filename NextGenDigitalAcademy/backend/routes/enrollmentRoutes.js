import { Router } from 'express';
import { store } from '../store.js';

export const enrollmentRoutes = Router();

enrollmentRoutes.post('/', (req, res) => {
  const { name, email, phone, courseId } = req.body;

  if (!name || !email || !courseId) {
    return res.status(400).json({ message: 'Name, email, and course selection are required.' });
  }

  const existing = store.getEnrollments().find(e => e.email === email && e.courseId === courseId);
  if (existing) {
    return res.status(409).json({ message: 'You have already submitted an enrollment request for this course.' });
  }

  const enrollment = store.addEnrollment({ name, email, phone, courseId });
  res.status(201).json({ message: 'Enrollment request submitted successfully! We will contact you with next steps.', enrollment });
});
