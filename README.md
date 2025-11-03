# career-connect

CareerConnect — a small Vite + React demo app to track job applications.

Features
- Signup & Login (React Router)
- Session & data stored in localStorage
- Dashboard showing registered users and a job tracker table
- Add / Edit / Delete jobs
- Responsive navbar and Tailwind CSS styling

Quick start (PowerShell)

1. Install dependencies:

```powershell
npm install
```

2. Start dev server:

```powershell
npm run dev
```

Open the URL shown by Vite (usually http://localhost:5173).

Demo account: alice@example.com / password123

LocalStorage keys used:
- `cc_users` — array of users with jobs
- `cc_session` — current logged-in user
