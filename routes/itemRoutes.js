import express from "express";
import {
  itemControlller,
  createItemController,
  deleteItemController,
  singleItemController,
  updateItemController,
} from "../controllers/itemController.js";

const router = express.Router();

//routes
// create item
router.post("/create-item", createItemController);

//update item
router.put("/update-item/:id", updateItemController);

//getALl item
router.get("/get-item", itemControlller);

//single item
router.get("/single-item/:id", singleItemController);

//delete item
router.delete("/delete-item/:id", deleteItemController);

export default router;
