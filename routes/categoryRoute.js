import express from "express";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes
// create category
router.post("/create-category", createCategoryController);

//update category
router.put("/update-category/:id", updateCategoryController);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:id", singleCategoryController);

//delete category
router.delete("/delete-category/:id", deleteCategoryController);

export default router;
