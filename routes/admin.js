import express from "express";
import Withdrawal from "../models/Withdrawal.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/withdrawals", verifyToken, isAdmin, async (req, res) => {
  const pending = await Withdrawal.find({ status: "pending" }).populate(
    "userId"
  );
  res.json(pending);
});

router.put("/withdrawals/:id/pay", verifyToken, isAdmin, async (req, res) => {
  await Withdrawal.findByIdAndUpdate(req.params.id, { status: "paid" });
  res.json({ message: "Marked as paid" });
});

export default router;
