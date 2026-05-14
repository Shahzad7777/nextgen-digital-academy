import { Router } from 'express';

export const courseRoutes = Router();

const COURSES = [
  { id: 'digital-marketing', title: 'Digital Marketing Mastery', level: 'beginner', duration: '8 Weeks', price: 'PKR 15,000' },
  { id: 'freelancing', title: 'Freelancing & Remote Work', level: 'beginner', duration: '6 Weeks', price: 'PKR 12,000' },
  { id: 'web-development', title: 'Web Development Bootcamp', level: 'intermediate', duration: '12 Weeks', price: 'PKR 25,000' },
  { id: 'graphic-design', title: 'Graphic Design Essentials', level: 'beginner', duration: '6 Weeks', price: 'PKR 10,000' },
  { id: 'ecommerce', title: 'E-Commerce & Dropshipping', level: 'intermediate', duration: '8 Weeks', price: 'PKR 18,000' },
  { id: 'video-editing', title: 'Video Editing & Content Creation', level: 'beginner', duration: '6 Weeks', price: 'PKR 12,000' }
];

courseRoutes.get('/', (req, res) => {
  res.json({ courses: COURSES });
});

courseRoutes.get('/:id', (req, res) => {
  const course = COURSES.find(c => c.id === req.params.id);
  if (!course) {
    return res.status(404).json({ message: 'Course not found.' });
  }
  res.json({ course });
});
