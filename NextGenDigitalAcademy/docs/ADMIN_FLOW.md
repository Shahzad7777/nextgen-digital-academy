# Admin Flow

## Overview

The admin panel allows administrators to manage enrollment requests and view contact messages.

## Authentication

1. Admin logs in at `/login.html` with admin credentials
2. Default admin account: `admin@nextgendigitalacademy.com` (created via seed script)
3. On successful login, user is redirected to `/admin.html`

## Admin Dashboard Features

- **Enrollment Requests**: View all enrollment requests with student name, email, course, status, and date
- **Contact Messages**: View all contact form submissions
- **Statistics**: Overview of total users, enrollments, and messages

## Enrollment Process

1. Student visits the website and browses courses
2. Student clicks "Enroll Now" on a course
3. Student fills out enrollment form (name, email, phone)
4. Enrollment request is saved with "pending" status
5. Admin reviews enrollment requests in the admin panel
6. Student pays manually and sends payment slip via WhatsApp
7. Admin grants access after payment verification
