import express from "express";
import {
  saleControlller,
  createSaleController,
  singleSaleController,
  updateSaleController,
  deleteSaleController,
} from "../controllers/saleController.js";

const router = express.Router();

//routes
// create item
router.post("/create-sale", createSaleController);

//update item
router.put("/update-sale/:id", updateSaleController);

//getALl item
router.get("/get-sale", saleControlller);

//single item
router.get("/single-sale/:id", singleSaleController);

//delete item
router.delete("/delete-sale/:id", deleteSaleController);

export default router;
