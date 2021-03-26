import express from "express";
import { generateAPIToken } from "../controllers/user.controller";
import { authorizeAdmin } from "../middleware/authorize-admin";
import { protect } from "../middleware/protect";
const router = express.Router();

router.route("/generate-api-key").put(protect, generateAPIToken);

export default router;
