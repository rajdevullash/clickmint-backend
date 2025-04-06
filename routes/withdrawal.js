import express from "express";
import Withdrawal from "../models/Withdrawal.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  const { method, phone } = req.body;

  const withdrawal = new Withdrawal({
    userId: req.user.id,
    method,
    phone,
    points: 1500,
  });

  await withdrawal.save();
  res.status(201).json({ message: "Withdrawal requested" });
});

export default router;
