import itemModel from "../models/itemModel.js";
import slugify from "slugify";

// create item
export const createItemController = async (req, res) => {
  try {
    const { code, name, categoryId, subCategoryId, quantityId } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }

    const existingCode = await itemModel.findOne({ code });
    if (existingCode) {
      return res.status(200).send({
        success: false,
        message: "Item code already exist",
      });
    }

    const item = await new itemModel({
      code,
      name,
      slug: slugify(name),
      categoryId,
      subCategoryId,
      quantityId,
    }).save();
    res.status(201).send({
      success: true,
      message: "New item created",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in item",
    });
  }
};

//update item
export const updateItemController = async (req, res) => {
  try {
    const { code, name, categoryId, subCategoryId, quantityId } = req.body;
    const { id } = req.params;
    const item = await itemModel.findByIdAndUpdate(
      id,
      {
        code,
        name,
        slug: slugify(name),
        categoryId,
        subCategoryId,
        quantityId,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Item updated successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating item",
    });
  }
};

// get all item
export const itemControlller = async (req, res) => {
  try {
    const item = await itemModel
      .find({ status: 1 })
      .populate("categoryId")
      .populate("subCategoryId")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All items list",
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
      message: "Get single item successfully",
      item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single item",
    });
  }
};

//delete item
export const deleteItemController = async (req, res) => {
  try {
    const { id } = req.params;
    await itemModel.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting item",
      error,
    });
  }
};
