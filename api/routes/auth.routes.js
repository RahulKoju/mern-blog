import { Router } from "express";
import { handleSignUp } from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", handleSignUp);

export default router;
