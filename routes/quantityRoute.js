import express from "express";
import {
  quantityControlller,
  createQuantityController,
  deleteQuantityController,
  singleQuantityController,
  updateQuantityController,
} from "../controllers/quantityController.js";

const router = express.Router();

//routes
// create quantity
router.post("/create-quantity", createQuantityController);

//update quantity
router.put("/update-quantity/:id", updateQuantityController);

//getALl quantity
router.get("/get-quantity", quantityControlller);

//single quantity
router.get("/single-quantity/:id", singleQuantityController);

//delete quantity
router.delete("/delete-quantity/:id", deleteQuantityController);

export default router;
