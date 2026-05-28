import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { prisma } from "./lib/prisma.js";

import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Default route to check if server is running
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Health check route
app.get('/health', (_req, res) => {
    res.json({ message: 'API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});