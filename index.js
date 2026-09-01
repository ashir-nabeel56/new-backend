const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.json());

// Serverless Safety: Async DB Connection
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("Database Connection Failed:", err);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Home
app.get("/", (req, res) => {
  res.send("E-Commerce Backend is running");
});

module.exports = app;