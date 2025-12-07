import express from "express";

import checkAuth from "../middleware/checkAuth.js";
import { createModel } from "../controllers/modelController.js";
import AIModel from "../models/Model.js";

const router = express.Router();

router.post("/add-model", checkAuth, createModel);

router.get("/all", async (req, res) => {
  try {
    const models = await AIModel.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const model = await AIModel.findById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/api/models/:id/purchase", async (req, res) => {
  try {
    const updatedModel = await Model.findByIdAndUpdate(
      req.params.id,
      { $inc: { purchased: 1 } },
      { new: true }
    );

    if (!updatedModel) {
      return res.status(404).json({ error: "Model not found" });
    }

    res.json(updatedModel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/api/purchases", async (req, res) => {
  try {
    const { modelId, userEmail } = req.body;
    const purchase = new Purchase({ modelId, userEmail });
    await purchase.save();
    res.json({ success: true, purchase });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/api/models/:id", async (req, res) => {
  try {
    const updatedModel = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedModel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/api/models/:id", async (req, res) => {
    try {
        await Model.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
    }

});

export default router;
