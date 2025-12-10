import express from "express";
import AIModel from "../models/Model.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// ============================
// ROUTES
// ============================

// GET most recent 6 models
router.get("/recent", async (req, res) => {
  try {
    const models = await AIModel.find()
      .sort({ createdAt: -1 })
      .limit(6);
    console.log("Recent models:", models); // debug
    res.json(models);
  } catch (err) {
    console.error("Error fetching recent models:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all models
router.get("/all", async (req, res) => {
  try {
    const models = await AIModel.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single model by ID
router.get("/:id", async (req, res) => {
  try {
    const model = await AIModel.findById(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.json(model);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();
    const models = await AIModel.find({ createdBy: email });
    res.json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new model
router.post("/add-model", verifyToken, async (req, res) => {
  try {
    const loggedInEmail = req.user.email;
    const newModel = new AIModel({
      ...req.body,
      createdBy: loggedInEmail,
    });
    await newModel.save();
    res.json({ message: "Model Added!", data: newModel });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.put("/:id", async (req, res) => {
  console.log("Update request body:", req.body);
  console.log("Update ID:", req.params.id);

  try {
    const updatedModel = await AIModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedModel) return res.status(404).json({ message: "Model not found" });

    res.json(updatedModel);
  } catch (err) {
    console.error("Update Error:", err); // <-- show error in terminal
    res.status(500).json({ error: err.message });
  }
});




router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const model = await AIModel.findById(id);

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    // Optional: check if current user is owner (recommended)
    // if (model.createdBy !== req.user.email) return res.status(403).json({ message: "Forbidden" });

    await AIModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/:id/purchase", verifyToken, async (req, res) => {
  try {
    const { method, provider } = req.body; // payment info from frontend
    const userEmail = req.user.email;     // from verifyToken

    const updatedModel = await AIModel.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { purchased: 1 },
        $push: { buyers: { email: userEmail, method, provider } },
      },
      { new: true }
    );

    if (!updatedModel) return res.status(404).json({ error: "Model not found" });

    res.json({ message: "Purchase successful!", model: updatedModel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.post("/:id/purchase", verifyToken, async (req, res) => {
  try {
    const modelId = req.params.id;
    const userEmail = req.user.email; // from token
    const { paymentMethod, provider } = req.body;

    // Find the model
    const model = await AIModel.findById(modelId);
    if (!model) return res.status(404).json({ message: "Model not found" });

    // Increment purchased count
    model.purchased = (model.purchased || 0) + 1;
    await model.save();

    // Save purchase info
    const purchase = new Purchase({
      userEmail,
      modelId: model._id,
      modelName: model.name,
      paymentMethod,
      provider,
      amount: model.price || 0,
    });
    await purchase.save();

    res.json({ message: "Purchase successful", data: purchase });
  } catch (err) {
    console.error("Purchase error:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
