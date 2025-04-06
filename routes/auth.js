import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { nanoid } from "nanoid";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, referredBy } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const referralCode = nanoid(6);
  const newUser = new User({ name, email, password, referralCode, referredBy });

  await newUser.save();

  // Reward referrer
  if (referredBy) {
    const referrer = await User.findOne({ referralCode: referredBy });
    if (referrer && !referrer.referrals.includes(newUser._id.toString())) {
      referrer.points += 20;
      referrer.referrals.push(newUser._id.toString());
      await referrer.save();
    }
  }

  res.status(201).json({ message: "User registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, isAdmin: user.isAdmin });
});

export default router;
