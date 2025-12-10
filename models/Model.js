import mongoose from "mongoose";

// Sub-schema for storing buyer info
const buyerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  method: { type: String, required: true }, // e.g., CARD, MFS, BANK
  provider: { type: String },               // e.g., bKash, Nagad, etc.
  purchasedAt: { type: Date, default: Date.now },
});

// Main AI Model schema
const AImodelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    framework: { type: String, required: true },
    useCase: { type: String, default: "General" },
    dataset: { type: String, default: "N/A" },
    description: { type: String },
    image: { type: String, match: /^https?:\/\// }, // valid URL
    createdBy: { type: String, required: true },
    purchased: { type: Number, default: 0 },
    buyers: { type: [buyerSchema], default: [] },   // array of buyers
  },
  { timestamps: true }
);

const AIModel = mongoose.model("AIModel", AImodelSchema);

export default AIModel;
