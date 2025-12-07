import AIModel from "../models/Model.js";


export const createModel = async (req, res) => {
  try {
    const { name, framework, useCase, dataset, description, image } = req.body;

    const newModel = new AIModel({
      name,
      framework,
      useCase,
      dataset,
      description,
      image,
      createdBy: req.user.email, 
    });

    const savedModel = await newModel.save();
    res.status(201).json(savedModel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
