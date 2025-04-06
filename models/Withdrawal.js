import mongoose from "mongoose";

const withdrawalSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  method: String,
  phone: String,
  points: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Withdrawal", withdrawalSchema);
