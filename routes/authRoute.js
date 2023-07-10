import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routes
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/admin-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
