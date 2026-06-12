import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { apiLimiter } from "./middleware/rateLimit";
import performanceRoutes from "./routes/performanceRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
// Rate Limiting Middleware
app.use(apiLimiter);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hello from the default Route"
    });
});

// API Performance Route
app.use("/api/performance", performanceRoutes);
// Auth Route
app.use("/api/auth", authRoutes);
// User Route
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});