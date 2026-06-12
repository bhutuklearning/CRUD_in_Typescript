import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Hello from the default Route"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});