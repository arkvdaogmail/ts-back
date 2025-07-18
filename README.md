# TrustSeal Project

This is a full-stack application with a Next.js frontend and Express.js backend.

## Project Structure

- `/app` - Next.js frontend application
- `/backend` - Express.js backend API
- `/frontend` - Legacy HTML frontend (can be removed if not needed)

## Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file and add your environment variables:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
# Add other environment variables as needed
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at http://localhost:3000

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend directory:
```
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
STRIPE_SECRET_KEY=your_stripe_key
SENDGRID_API_KEY=your_sendgrid_key
```

4. Run the backend:
```bash
npm run dev
```

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend

The backend needs to be deployed separately to a Node.js hosting service like:
- Railway
- Render
- Heroku
- DigitalOcean App Platform

## Environment Variables

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Backend (.env)
- `PORT` - Server port
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `SENDGRID_API_KEY` - SendGrid API key