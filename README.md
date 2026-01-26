
# Next.js Auth Example

This project uses Next.js (App Router, TypeScript, Tailwind CSS), Prisma, and NextAuth.js with credentials (email/password) authentication.

## Features
- User registration (email, password, name)
- User login (NextAuth credentials)
- Prisma ORM with PostgreSQL
- Secure password hashing (bcrypt)

## Getting Started

1. **Install dependencies:**
	```bash
	npm install
	```
2. **Configure your database:**
	- Update the `DATABASE_URL` in `.env` to point to your PostgreSQL instance.
3. **Run Prisma migrations:**
	```bash
	npx prisma migrate dev
	```
4. **Set NextAuth secret:**
	- Add `NEXTAUTH_SECRET` to your `.env` file (use `openssl rand -base64 32` to generate one).
5. **Start the development server:**
	```bash
	npm run dev
	```

## Auth Pages
- `/auth/register` — Register a new user
- `/auth/signin` — Login with email and password

## API
- `POST /api/auth/register` — Register endpoint (JSON: `{ email, password, name }`)
- NextAuth API: `/api/auth/[...nextauth]`

---

This is a minimal authentication starter. Extend as needed for your app.
