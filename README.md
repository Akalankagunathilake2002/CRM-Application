# LeadFlow CRM - Full Stack CRM Lead Management System

## Demo Video Link

Demo Video: PASTE_YOUR_DEMO_VIDEO_LINK_HERE

Example:
https://drive.google.com/file/d/YOUR_VIDEO_ID/view

---

## Project Overview

LeadFlow CRM is a full-stack Customer Relationship Management system developed to manage sales leads, track sales pipeline progress, store lead notes, and view dashboard statistics.

The system allows a user to log in, create new leads, view all leads, search and filter leads, update lead information, update lead status, add notes for each lead, and view CRM performance through a dashboard.

This project was developed using a separate frontend and backend architecture. The frontend was built using Next.js and TypeScript, while the backend was built using Node.js and Express.js. MongoDB Atlas was used as the cloud database.

The project was deployed using Vercel as two separate projects:

Frontend:
https://crm-frontend-five-snowy.vercel.app

Backend:
https://crm-backend-flame-pi.vercel.app

---

## Tech Stack Used

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast
- Lucide React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- CORS
- dotenv

### Database

- MongoDB Atlas

### AI Chatbot

- Groq API
- Llama model through Groq API

### Deployment

- Vercel for frontend
- Vercel for backend
- MongoDB Atlas for database hosting

---

## Features Implemented

### Authentication

- Login system using email and password
- JWT token-based authentication
- Protected dashboard and CRM pages
- User session stored in browser local storage
- Default admin user is created automatically if it does not already exist

### Dashboard

- Total leads count
- New leads count
- Qualified leads count
- Won leads count
- Lost leads count
- Total estimated deal value
- Total won deal value
- Light modern dashboard UI

### Lead Management

- Create a new lead
- View all leads
- View single lead details
- Update lead information
- Delete lead
- Search leads by name, company, or email
- Filter leads by status
- Filter leads by lead source
- Filter leads by assigned salesperson

### Lead Status Management

Supported lead statuses:

- New
- Contacted
- Qualified
- Proposal Sent
- Won
- Lost

### Lead Notes

- Add notes for a lead
- View notes for each lead
- Delete notes
- Notes include creator name and created date

### AI Chatbot

- Floating chatbot widget
- Helps explain the CRM system
- Can answer questions about features, demo flow, dashboard, lead management, and tech stack
- Uses Groq API from the backend

### UI/UX

- Modern landing page
- Separate public header and footer
- Light theme CRM dashboard
- Styled lead list page
- Styled create lead page
- Styled lead details page
- Floating chatbot
- Responsive layout improvements

---

## Project Folder Structure

CRM-Application/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── leadController.js
│   │   ├── noteController.js
│   │   └── chatController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   └── Note.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── leadRoutes.js
│   │   ├── noteRoutes.js
│   │   └── chatRoutes.js
│   ├── server.js
│   ├── vercel.json
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── leads/
│   │   ├── login/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── PublicHeader.tsx
│   │   ├── PublicFooter.tsx
│   │   ├── DashboardCards.tsx
│   │   ├── LeadForm.tsx
│   │   ├── LeadTable.tsx
│   │   └── ChatBot.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── types.ts
│   ├── package.json
│   └── .env.local
│
├── .gitignore
└── README.md

---

## How to Run Locally

### Prerequisites

Install the following before running the project:

- Node.js
- npm
- Git
- MongoDB Atlas account
- Groq API key, if chatbot is used

---

## Backend Setup

### 1. Go to backend folder

```bash
cd backend
