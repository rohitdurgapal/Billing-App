import express from "express";
import {
  subCategoryControlller,
  createSubCategoryController,
  deleteSubCategoryController,
  singleSubCategoryController,
  updateSubCategoryController,
} from "../controllers/subCategoryController.js";

const router = express.Router();

//routes
// create sub-category
router.post("/create-sub-category", createSubCategoryController);

//update sub-category
router.put("/update-sub-category/:id", updateSubCategoryController);

//getALl sub-category
router.get("/get-sub-category", subCategoryControlller);

//single sub-category
router.get("/single-sub-category/:id", singleSubCategoryController);

//delete sub-category
router.delete("/delete-sub-category/:id", deleteSubCategoryController);

export default router;
