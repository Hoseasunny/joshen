# JOSHEM Cleaning Services Web Platform

Full-stack implementation based on `JOSHEM_Cleaning_Services_Web_Platform_Documentation.md`.

## Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL

## Folder structure

- `frontend` React application
- `backend` Express API

## Backend setup

1. Create a PostgreSQL database named `joshem`.
2. Copy `backend/.env.example` to `backend/.env` and update credentials.
3. Install dependencies:

```
cd backend
npm install
```

4. Initialize schema and seed data:

```
psql -d joshem -f src/schema.sql
psql -d joshem -f src/seed.sql
```

5. Start the API:

```
npm run dev
```

Admin account seeded:

- Email: `admin@joshem.local`
- Password: `Admin123`

## Frontend setup

1. Copy `frontend/.env.example` to `frontend/.env` and adjust API URL if needed.
2. Install dependencies:

```
cd frontend
npm install
```

3. Run the app:

```
npm run dev
```

Open `http://localhost:5173`.

## Notes

- Order statuses follow: Pending, Confirmed, Assigned, In Progress, Completed, Cancelled.
- The admin panel is protected by role `admin`.
