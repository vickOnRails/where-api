import express from "express";
import { RegisterUser, SignUserIn } from "../controllers/user.controller";
const router = express.Router();

// api/auth
router.route("/signup").post(RegisterUser);
router.route("/signin").post(SignUserIn);

export default router;
