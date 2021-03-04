import express from "express";
import {
  DeleteUser,
  generateAPIToken,
  RegisterUser,
  SignUserIn,
} from "../controllers/user.controller";
import { authorizeAdmin } from "../middleware/authorize-admin";
import { protect } from "../middleware/protect";
const router = express.Router();

// api/auth
router.route("/:userId").delete(DeleteUser);
router.route("/signup").post(RegisterUser);
router.route("/signin").post(SignUserIn);
router.route("/generate-api-key").put(protect, generateAPIToken);

export default router;
