import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    modelId: { type: mongoose.Schema.Types.ObjectId, ref: "AIModel", required: true },
    modelName: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    provider: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, default: "Successful" },
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);
