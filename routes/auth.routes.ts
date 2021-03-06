import express from "express";
import {
  DeleteUser,
  generateAPIToken,
  MakeAdmin,
  RegisterUser,
  SignUserIn,
  GetAllUsers,
  disconnect,
} from "../controllers/user.controller";
import { authorizeAdmin } from "../middleware/authorize-admin";
import { protect } from "../middleware/protect";
const router = express.Router();

// api/auth
router.route("/").get(protect, authorizeAdmin, GetAllUsers);
router.route("/:userId").delete(DeleteUser);
router.route("/:userId/make-admin").put(MakeAdmin);
router.route("/signup").post(RegisterUser);
router.route("/signin").post(SignUserIn);
router.route("/generate-api-key").put(protect, generateAPIToken);
router.route("/close-connection").get(protect, authorizeAdmin, disconnect);

export default router;
