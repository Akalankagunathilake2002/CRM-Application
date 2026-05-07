# LeadFlow CRM - Full Stack CRM Lead Management System

## Project Overview

LeadFlow CRM is a full-stack Customer Relationship Management application developed for managing sales leads in a small sales team.

The system allows users to log in, manage leads, track lead progress through a sales pipeline, add notes to leads, search and filter lead records, and view dashboard statistics such as total leads, new leads, qualified leads, won leads, lost leads, total estimated deal value, and total won deal value.

The application is built using a separate frontend and backend structure. The frontend is developed with Next.js and TypeScript, while the backend is developed with Node.js and Express.js. MongoDB Atlas is used as the cloud database.

Deployed Frontend:  
https://crm-frontend-five-snowy.vercel.app

Deployed Backend:  
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

- Email and password login
- JWT token-based authentication
- Protected CRM pages
- Default admin user creation
- Local storage-based frontend session handling

### Dashboard

- Total leads count
- New leads count
- Qualified leads count
- Won leads count
- Lost leads count
- Total estimated deal value
- Total won deal value
- Light modern CRM dashboard UI

### Lead Management

- Create new leads
- View all leads
- View single lead details
- Edit lead information
- Delete leads
- Update lead status
- Search leads by lead name, company name, or email
- Filter leads by status
- Filter leads by lead source
- Filter leads by assigned salesperson

### Lead Statuses

- New
- Contacted
- Qualified
- Proposal Sent
- Won
- Lost

### Lead Notes

- Add notes to a lead
- View notes for each lead
- Delete notes
- Each note stores content, created by, and created date

### AI Chatbot

- Floating chatbot widget
- CRM help assistant
- Can explain the project features
- Can explain demo flow
- Can explain dashboard, leads, notes, and tech stack
- Uses Groq API from the backend

### UI/UX

- Modern landing page
- Separate public header and footer
- Styled login page
- Styled dashboard page
- Styled lead list page
- Styled create lead page
- Styled lead details page
- Responsive layout improvements
- Light theme CRM interface

---

## How to Run Locally

Before running the project, make sure you have installed:

- Node.js
- npm
- Git
- MongoDB Atlas account
- Groq API key, if chatbot is used

---

### 1. Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install backend dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```txt
backend/.env
```

Add the following environment variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/crm_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

Run the backend server:

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

To test the backend, open this URL in the browser:

```txt
http://localhost:5000
```

Expected response:

```json
{
  "success": true,
  "message": "CRM Backend API is running"
}
```

---

### 2. Frontend Setup

Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Create a `.env.local` file inside the frontend folder:

```txt
frontend/.env.local
```

Add the following environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Run the frontend development server:

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:3000
```

Open the application in the browser:

```txt
http://localhost:3000
```

---

## Environment Variables

### Backend Environment Variables

```env
PORT=5000
MONGO_URI=MongoDB Atlas connection string
JWT_SECRET=Secret key used for signing JWT tokens
JWT_EXPIRES_IN=JWT token expiry duration
FRONTEND_URL=Frontend URL allowed by backend CORS
GROQ_API_KEY=Groq API key for chatbot
GROQ_MODEL=Groq model name
```

Local backend example:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/crm_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=crm_secret_key_12345
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

Deployed backend example:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/crm_db?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=crm_secret_key_12345
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://crm-frontend-five-snowy.vercel.app
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile
```

### Frontend Environment Variable

```env
NEXT_PUBLIC_API_URL=Backend API base URL
```

Local frontend example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Deployed frontend example:

```env
NEXT_PUBLIC_API_URL=https://crm-backend-flame-pi.vercel.app/api
```

---

## Test Login Credentials

Use the following credentials to log in:

```txt
Email: admin@example.com
Password: password123
```

The backend automatically creates this default admin user when the server starts, if the user does not already exist in the database.

---

## Database Setup

MongoDB Atlas was used as the database.

Database setup steps:

1. Created a MongoDB Atlas account.
2. Created a new MongoDB project.
3. Created a MongoDB cluster.
4. Created a database user.
5. Added network access IP in MongoDB Atlas.
6. Copied the MongoDB connection string.
7. Added the connection string to `backend/.env` as `MONGO_URI`.
8. Connected the backend to MongoDB using Mongoose.

Database name:

```txt
crm_db
```

Collections used:

```txt
users
leads
notes
```

User collection stores:

```txt
name
email
password
role
createdAt
updatedAt
```

Lead collection stores:

```txt
leadName
companyName
email
phoneNumber
leadSource
assignedSalesperson
status
estimatedDealValue
createdAt
updatedAt
```

Note collection stores:

```txt
lead
content
createdBy
createdAt
updatedAt
```

---

## Known Limitations

- Only one default admin user is created automatically.
- There is no separate user registration page.
- Role-based access control is basic.
- The chatbot can explain the CRM but does not directly read live database records.
- No file upload feature is included.
- No email notification feature is included.
- No advanced analytics charts are included.
- No pagination is implemented for large lead datasets.
- Deployment preview URLs may require Vercel authentication if protection is enabled.
- CORS requires the correct frontend URL to be configured in backend environment variables.

---

## Reflection

This project helped me understand how to build a full-stack web application using a modern JavaScript stack. I learned how to connect a Next.js frontend with an Express.js backend and how to store application data in MongoDB Atlas.

I also learned how JWT authentication works, how protected routes can be handled, and how frontend pages can communicate with backend APIs using Axios. Building the lead management features helped me understand CRUD operations, filtering, searching, and database relationships between leads and notes.

During deployment, I faced issues related to Vercel root directory settings, framework presets, environment variables, deployment protection, backend CORS configuration, and frontend-backend API connection. Solving these issues improved my debugging and deployment skills.

The final application includes authentication, lead CRUD, lead status tracking, lead notes, dashboard statistics, search and filtering, and an AI chatbot assistant. This project improved my confidence in full-stack development, API integration, database design, UI styling, deployment, and explaining technical work clearly.
