import itemModel from "../models/itemModel.js";
import slugify from "slugify";

// create item
export const createItemController = async (req, res) => {
  try {
    const { code, name, price } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    if (!code) {
      return res.status(401).send({ message: "Code is required" });
    }
    if (!price) {
      return res.status(401).send({ message: "Price is required" });
    }
    const existingCode = await itemModel.findOne({ code });
    if (existingCode) {
      return res.status(200).send({
        success: false,
        message: "Item Code Already Exist.",
      });
    }
    const existingName = await itemModel.findOne({ name });
    if (existingName) {
      return res.status(200).send({
        success: false,
        message: "Item Name Already Exist.",
      });
    }
    const item = await new itemModel({
      code,
      name,
      slug: slugify(name),
      price,
    }).save();
    res.status(201).send({
      success: true,
      message: "New Item Created",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Item",
    });
  }
};

//update item
export const updateItemController = async (req, res) => {
  try {
    const { code, name, price } = req.body;
    const { id } = req.params;
    const item = await itemModel.findByIdAndUpdate(
      id,
      { code, name, slug: slugify(name), price },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Item Updated Successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Item",
    });
  }
};

// get all item
export const itemControlller = async (req, res) => {
  try {
    const item = await itemModel.find().sort({ code: -1 });
    res.status(200).send({
      success: true,
      message: "All Items List",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all items",
    });
  }
};

// single item
export const singleItemController = async (req, res) => {
  try {
    const item = await itemModel.findOne({ _id: req.params.id });
    res.status(200).send({
      success: true,
      message: "Get Single Item Successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Item",
    });
  }
};

//delete item
export const deleteItemController = async (req, res) => {
  try {
    const { id } = req.params;
    await itemModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Item Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting item",
      error,
    });
  }
};
