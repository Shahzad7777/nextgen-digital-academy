# Implementation Plan

## Architecture

- **Frontend**: Static HTML/CSS/JS served from `frontend/` directory
- **Backend**: Express.js API server in `backend/` directory
- **API (Vercel)**: Serverless functions in `api/` directory that proxy to the Express app
- **Storage**: File-based JSON storage in `data/` directory (upgradeable to MongoDB)

## Frontend Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, features, courses, about, testimonials, contact form |
| Course Detail | `course.html` | Individual course info, curriculum, enrollment CTA |
| Login/Register | `login.html` | Authentication with tabs for sign in and registration |
| Dashboard | `dashboard.html` | Student dashboard showing enrolled courses |
| Admin Panel | `admin.html` | Admin view for enrollments and contact messages |
| Privacy Policy | `privacy.html` | Privacy policy page |
| Terms of Service | `terms.html` | Terms of service page |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/enroll` | Submit enrollment request |
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/courses` | List all courses |
| GET | `/api/courses/:id` | Get course details |
| GET | `/api/admin/enrollments` | Admin: list enrollments |
| GET | `/api/admin/contacts` | Admin: list contact messages |
| GET | `/api/admin/stats` | Admin: dashboard statistics |

## Deployment

- Frontend deploys to Vercel as static files
- API routes handled by Vercel serverless functions
- For local development, run `npm run server` for API and `npm run dev` for frontend
