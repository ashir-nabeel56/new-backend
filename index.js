const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
connectDB();


app.use("/auth", authRoutes);
// Products routes
app.use("/products", productRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("E-Commerce Backend is running");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`BACKEND IS RUNNING AT PORT ${PORT}`);
});