# Assignment

In this Assignment folder, given by YB Daa.
I have to make a backend based in node.js using TS as language.
The Database I am using in Postgresql(through NeonDB).
The ORM I will be using is Prisma ORM.

### Just to keepin mind

Latency:
In Computer Science, latency refers to the time delay between the moment a system receives an input (like a request or an action) and the moment it provides an output (the response or result). It is typically measured in milliseconds (ms) or microseconds and is a critical metric for determining a system's responsiveness.

Throughput:
In Computer Science, throughput is the rate at which a system processes or transfers data, completes tasks, or handles requests within a specific period. It is the fundamental metric used to evaluate a system's overall capacity, efficiency, and ability to handle scale.

Link to understand the difference better between Latency and Throughput:
https://aws.amazon.com/compare/the-difference-between-throughput-and-latency/


In short:
Latency and throughput are two metrics that measure the performance of a computer network. Latency is the delay in network communication. It shows the time that data takes to transfer across the network. Networks with a longer delay or lag have high latency, while those with fast response times have lower latency. In contrast, throughput refers to the average volume of data that can actually pass through the network over a specific time. It indicates the number of data packets that arrive at their destinations successfully and the data packet loss.

THROUGHPUT:
Means:
“How many requests can backend handle?”
Example:
100 requests/sec
Higher throughput = faster backend.

LATENCY:
Means:
“How long ONE request takes?”
Example:
200ms
Lower latency = better.


### Tasks:
1. FAST ROUTE

Example:
GET /fast
Returns instantly.

2. SLOW ROUTE

Example:
GET /slow
Adds artificial delay.

3. CPU HEAVY ROUTE

Example:
GET /cpu-heavy
Simulates expensive computation.

4. DB HEAVY ROUTE

Example:
GET /db-heavy
Makes multiple DB queries.

# Steps Performed Till Now
Inside this folder:
### Step-1: Initializing the Project
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
  createdAt DateTime @default(now())
}
```
### Step-7: Run Migration & Generate Client:

`npx prisma migrate dev --name init`
(Creates the actual tables in your Neon PostgreSQL database)

`npx prisma generate`
(Generates the TypeScript client from your schema)
