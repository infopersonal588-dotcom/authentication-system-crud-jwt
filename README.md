# Authentication System with CRUD and JWT

A full-stack MERN application with user authentication, notes CRUD, JWT security, and a dark glassmorphism UI.

## Features

- React + Vite frontend
- Express + Node backend
- MongoDB Atlas with Mongoose
- JWT authentication
- Protected routes
- Password hashing with `bcryptjs`
- User profile management
- Notes CRUD with search and filtering
- Responsive dark glassmorphism design
- Toast notifications and loading states

## Project Structure

```
client/
  package.json
  vite.config.js
  src/
    App.jsx
    main.jsx
    index.css
    components/
    pages/
    services/
    context/
server/
  package.json
  server.js
  config/db.js
  controllers/
  middleware/
  models/
  routes/
  .env.example
.gitignore
package.json
README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas connection string

### Setup

1. Clone or download the repository.
2. Create a `.env` file in `server/` using the `.env.example` file.
3. Install dependencies:
   - `npm install` in the root for workspace helper scripts (optional)
   - `cd server && npm install`
   - `cd client && npm install`

### Run locally

#### Backend

```bash
cd server
npm run dev
```

#### Frontend

```bash
cd client
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend runs on `http://localhost:5000`.

## API Documentation

### Auth Routes

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `PUT /api/users/profile/password`
- `DELETE /api/users/profile`

### Notes Routes

- `POST /api/notes`
- `GET /api/notes`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

## Deployment

- Frontend: Netlify (build `npm run build` inside `client`)
- Backend: Render / Heroku / Vercel (deploy `server` folder)
- Database: MongoDB Atlas

## Environment Variables

Create `server/.env` with:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
```
