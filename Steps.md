## Overiew
This file mainly focuses on how to setup the project who has no idea about the setting process of Ts server with Postgresql as DB with Prisma ORM.

The steps will be be given in an sequential order where it involves commands and other things.

### Step-1: Initializing project on local system
`mkdir project`
`cd project`
`npm init -y`

### Step-2: Initializing project on local system
`npm install express jsonwebtoken bcryptjs dotenv cors pg morgan`

#### Prisma + DB driver
`npm install @prisma/client @prisma/adapter-pg`

#### For Dev Only:
`npm install -D typescript tsx @types/node nodemon prisma`

`npm install -D @types/express @types/jsonwebtoken @types/bcryptjs @types/cors  @types/pg @types/morgan`

### Step-3: Generate tsconfig.json:
`npx tsc --init`

### Step-4: Updating tsconfig.json file(Fully upto You):
```{
  "compilerOptions": {
    //"rootDir": "./src",
    "outDir": "./dist",
    "module": "ESNext",
    "types": [
      "node"
    ],
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0"
  }
}
```

### Step-5: Initialize Prisma:
`npx prisma init`

This creates two things:
prisma/schema.prisma
.env

### Step-6: Implement prisma.schema:
prisma/schema.prisma:
```
generator client {
  provider     = "prisma-client-js"
  output       = "../generated/prisma"
  moduleFormat = "esm"
}

datasource db {
  provider = "postgresql"
}


model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Step-7: Run Migration & Generate Client:

`npx prisma migrate dev --name init`
(Creates the actual tables in your Neon PostgreSQL database)

`npx prisma generate`
(Generates the TypeScript client from your schema)

### Note:
I used "watch" to continuously wake up the server while I also installed nodemon.
The thing is nodemon is for the older version of the node.
<hr>