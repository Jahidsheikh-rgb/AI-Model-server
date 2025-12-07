import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import modelRoutes from "./Routes/ModelsRouter.js"
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://jahidsheikhjdp_db_user:CfOFNzcgb0jYz9d9@cluster0.iaqwldk.mongodb.net/AIModelDB";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected with Mongoose!");

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.use("/api/models", modelRoutes);

  } catch (err) {
    console.error("Error connecting DB:", err);
  }
}

run();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
