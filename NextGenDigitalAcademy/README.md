# NextGen Digital Academy

A modern online academy platform for digital skills education. Features course listings, enrollment requests, contact forms, student dashboard, and admin panel.

## Quick Start

```bash
# Install dependencies
npm install

# Seed the database (creates admin user)
npm run seed

# Start the API server
npm run server

# In another terminal, start the frontend
npm run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:5000

## Project Structure

```
NextGenDigitalAcademy/
  frontend/       # Static HTML/CSS/JS website
  backend/        # Express.js API server
  api/            # Vercel serverless functions
  data/           # JSON data storage (auto-created)
  scripts/        # Seed and utility scripts
  docs/           # Documentation
```

## Default Admin Login

After running `npm run seed`:
- Email: `admin@nextgendigitalacademy.com`
- Password: `admin123`

## Deployment

The project is configured for Vercel deployment. Push to your repository and connect it to Vercel for automatic deployments.
