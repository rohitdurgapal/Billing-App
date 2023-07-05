import express from "express";
import {
  companyController,
  createUpdateCompanyController,
} from "../controllers/companyController.js";

const router = express.Router();

//routes
// create company
router.post("/create-update-company", createUpdateCompanyController);

//single item
router.get("/get-company", companyController);

export default router;
