
# CRUD Backend in TypeScript

## Overview
This project is a scalable backend REST API built with **Node.js**, **TypeScript**, **Express**, and **Prisma ORM** for PostgreSQL. It demonstrates a clean architecture for user authentication and post management, following best practices for modularity and maintainability.

## Features
- User registration and login with secure password hashing (**bcryptjs**)
- JWT-based authentication and route protection
- CRUD operations for posts (create, read, update, delete)
- Middleware for authentication, logging (**morgan**), and CORS
- Modular structure with controllers, routes, and middlewares
- Environment variable management with **dotenv**
- Prisma ORM for database access and migrations

## Prerequisites
- Node.js v16 or higher
- PostgreSQL
- npm or yarn

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhutuklearning/CRUD_in_Typescript.git
   cd final_project
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.sample` to `.env` and fill in your values (e.g., `DATABASE_URL`, `PORT`, `JWT_SECRET`).
4. **Apply database migrations:**
   ```bash
   npx prisma migrate dev
   ```
5. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```
6. **Start the development server:**
   ```bash
   npm run dev
   ```

## Usage
- **Development:** `npm run dev`
- **Production:** `npm run build` then `npm start`

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT

### Posts (Protected)
- `GET /api/posts` — List all posts
- `GET /api/posts/:id` — Get a single post
- `POST /api/posts` — Create a new post
- `PUT /api/posts/:id` — Update a post (author only)
- `DELETE /api/posts/:id` — Delete a post (author only)

### Health
- `GET /health` — Health check endpoint

## Project Structure
```
final_project/
├── .env
├── .env.sample
├── .gitignore
├── package.json
├── prisma.config.ts
├── Readme.md
├── tsconfig.json
├── generated/
│   └── prisma/
│       ├── client.d.ts
│       ├── client.js
│       ├── ...
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20260528074117_init/
│           └── migration.sql
├── src/
│   ├── index.ts           # Entry point
│   ├── lib/
│   │   └── prisma.ts      # Prisma client setup
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── postController.ts
│   ├── middlewares/
│   │   └── auth.ts        # JWT authentication middleware
│   └── routes/
│       ├── authRoutes.ts
│       └── postRoutes.ts
```

## Database Schema

### User
| Field      | Type     | Attributes          |
|------------|----------|---------------------|
| id         | Int      | Primary Key         |
| email      | String   | Unique              |
| password   | String   |                     |
| posts      | Post[]   | Relation to `Post`  |
| createdAt  | DateTime | Default: `now()`    |

### Post
| Field      | Type     | Attributes                          |
|------------|----------|-------------------------------------|
| id         | Int      | Primary Key                         |
| title      | String   |                                     |
| content    | String   |                                     |
| authorId   | Int      | Foreign Key to `User`               |
| author     | User     | Relation to `User`                  |
| createdAt  | DateTime | Default: `now()`                    |
| updatedAt  | DateTime | Auto-updated on modification        |

## Environment Variables
See `.env.sample` for required variables:
- `PORT` — Port to run the server
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — Secret for signing JWTs

## Technologies Used
- Node.js, TypeScript, Express
- Prisma ORM, PostgreSQL
- JWT, bcryptjs, dotenv, morgan, cors

## License
This project is licensed under the ISC License.