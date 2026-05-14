import { Router } from 'express';
import { store } from '../store.js';

export const contactRoutes = Router();

contactRoutes.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  const contact = store.addContact({ name, email, phone, subject, message });
  res.status(201).json({ message: 'Thank you! Your message has been sent successfully. We will get back to you soon.', contact });
});
