import mongoose from "mongoose";

const AImodelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    framework: { type: String, required: true },
    useCase: { type: String, default: "General" },
    dataset: { type: String, default: "N/A" },
    description: { type: String },
    image: { type: String, match: /^https?:\/\// }, // must be valid URL
    createdBy: { type: String, required: true },
    purchased: { type: Number, default: 0 },

  },
  { timestamps: true }
);

const AIModel = mongoose.model("AIModel", AImodelSchema);

export default AIModel;
