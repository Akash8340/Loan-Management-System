import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import loanRoutes from "./routes/loanRoutes";
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Health Check
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Static Files
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});