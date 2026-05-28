# CRUD in TypeScript

## Overview
The **Final Project** is a scalable backend application built using **Node.js** and **TypeScript**. It leverages **Prisma** as the ORM and **PostgreSQL** as the database. This project demonstrates a CRUD (Create, Read, Update, Delete) application with a focus on clean architecture and best practices.

## Features
- User authentication and authorization using **JWT** and **bcryptjs**.
- RESTful API endpoints for managing users and posts.
- Database integration with **PostgreSQL** using **Prisma ORM**.
- Environment variable management with **dotenv**.
- Middleware for request logging using **morgan**.
- CORS support for cross-origin requests.

## Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL**
- **npm** or **yarn**

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bhutuklearning/CRUD_in_Typescript.git
   cd final_project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Copy the `.env.sample` file to `.env`.
   - Update the `.env` file with your database connection string and other required variables.

4. Apply database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

## Usage
- Start the development server:
  ```bash
  npm run dev
  ```

- Build the project:
  ```bash
  npm run build
  ```

- Start the production server:
  ```bash
  npm start
  ```

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
    ├── index.ts
    └── lib/
        └── prisma.ts
```

## Database Schema
The project uses the following database schema:

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

## Technologies Used
- **Node.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Express.js**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variable management
- **morgan** for logging
- **CORS** for cross-origin resource sharing

## License
This project is licensed under the ISC License. See the LICENSE file for details.