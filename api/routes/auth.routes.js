import { Router } from "express";
import {
  handleForgotPassword,
  handleResetPassword,
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.post("/signout", handleSignOut);
router.post("/forgot-password", handleForgotPassword);
router.post("/reset-password/:token", handleResetPassword);
export default router;
