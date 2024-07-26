import { Router } from "express";
import { handleSignIn, handleSignUp } from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", handleSignUp);
router.post("/signin",handleSignIn);
export default router;
