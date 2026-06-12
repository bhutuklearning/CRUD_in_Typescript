# Assignment

## Overview

This project is a simple backend API built with Node.js, TypeScript, Express, Prisma, and PostgreSQL. It was created to demonstrate the difference between latency and throughput by exposing routes with different levels of workload, along with a small authentication and user management flow.

The application uses Prisma as the ORM and stores user data in PostgreSQL. Authentication is handled with JWT tokens stored in HTTP-only cookies.

## Features

- TypeScript-based Express API
- PostgreSQL database with Prisma ORM
- User registration and login
- Cookie-based JWT authentication with refresh token support
- Protected user routes
- Performance testing routes for latency and throughput experiments
- Rate limiting for general and auth routes

## API Summary

### Authentication

- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Log in a user and set auth cookies
- `POST /api/auth/refreshAccessToken` - Issue a new access token using the refresh token cookie
- `POST /api/auth/logout` - Clear auth cookies

### Users

- `GET /api/users/me` - Get the currently logged-in user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID

### Performance

- `GET /api/performance/fast` - Returns immediately
- `GET /api/performance/slow` - Adds an artificial delay
- `GET /api/performance/cpu-heavy` - Simulates CPU-intensive work
- `GET /api/performance/db-heavy` - Performs multiple database queries

## Project Structure

```text
src/
	server.ts                 Express app entry point
	controllers/              Route handlers
	lib/prisma.ts             Prisma client setup
	middleware/                Auth and rate limiting middleware
	routes/                    API route definitions
prisma/
	schema.prisma              Database schema
generated/prisma/           Generated Prisma client output
```

## Requirements

- Node.js
- npm
- PostgreSQL database, such as NeonDB

## Environment Variables

Create a `.env` file in the `Assignment` folder using `.env.sample` as a reference.

```env
PORT=5000
DATABASE_URL="your_postgres_connection_string"
NODE_ENV=development
JWT_SECRET="your_jwt_secret_key"
ACCESS_TOKEN_SECRET="your_access_token_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure your database connection and secrets in `.env`.

3. Run the Prisma migration and generate the client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

4. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start the server in watch mode
- `npm start` - Start the server normally
- `npm run build` - Type-check and compile the TypeScript project

## Notes

- Authentication uses HTTP-only cookies, so API testing tools must send cookies between requests.
- The protected routes require a valid access token cookie.
- The performance routes are intentionally different so you can compare response times and backend behavior under load.