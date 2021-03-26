import express from "express";
import { SignUserIn, RegisterUser } from "../controllers/client.controller";
import { GetUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/auth/sign-in", SignUserIn);
router.post("/auth/sign-up", RegisterUser);
router.get("/users/:userId", GetUser);

export default router;
