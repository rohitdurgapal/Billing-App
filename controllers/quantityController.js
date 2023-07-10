import quantityModel from "../models/quantityModel.js";
import slugify from "slugify";

// create quantity
export const createQuantityController = async (req, res) => {
  try {
    const { name, nameValue } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!nameValue) {
      return res.status(400).send({ message: "Value is required" });
    }
    const existingName = await quantityModel.findOne({ name });
    if (existingName) {
      return res.status(500).send({
        success: false,
        message: "Quantity already exist",
      });
    }
    const quantity = await new quantityModel({
      name,
      slug: slugify(name),
      nameValue,
    }).save();
    res.status(201).send({
      success: true,
      message: "New quantity created",
      quantity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in quantity",
    });
  }
};

//update quantity
export const updateQuantityController = async (req, res) => {
  try {
    const { name, nameValue } = req.body;
    const { id } = req.params;
    const quantity = await quantityModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), nameValue },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Quantity updated successfully",
      quantity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating quantity",
    });
  }
};

// get all quantity
export const quantityControlller = async (req, res) => {
  try {
    const quantity = await quantityModel
      .find({ status: 1 })
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All quantity list",
      quantity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all quantity",
    });
  }
};

// single quantity
export const singleQuantityController = async (req, res) => {
  try {
    const quantity = await quantityModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Get single quantity successfully",
      quantity,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single quantity",
    });
  }
};

//delete quantity
export const deleteQuantityController = async (req, res) => {
  try {
    const { id } = req.params;
    await quantityModel.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Quantity deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting quantity",
      error,
    });
  }
};
