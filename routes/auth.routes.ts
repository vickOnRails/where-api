import express from "express";
import {
  DeleteUser,
  generateAPIToken,
  MakeAdmin,
  GetAllUsers,
} from "../controllers/user.controller";
import { authorizeAdmin } from "../middleware/authorize-admin";
import { protect } from "../middleware/protect";
const router = express.Router();

// api/auth

router.route("/generate-api-key").put(protect, generateAPIToken);

export default router;
