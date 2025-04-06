import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import withdrawalRoutes from "./routes/withdrawal.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/withdraw", withdrawalRoutes);
app.use("/admin", adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(5000, () => console.log("Server running on port 5000"));
});
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});