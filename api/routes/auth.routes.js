import { Router } from "express";
import {
  handleForgotPassword,
  handleResetPassword,
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "../controllers/auth.controller.js";
import validation from "../middlewares/validation.middleware.js";
import {
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../utils/validation.utils.js";
const router = Router();

router.post("/signup", validation(signUpSchema), handleSignUp);
router.post("/signin", validation(signInSchema), handleSignIn);
router.post("/signout", handleSignOut);
router.post("/forgot-password", handleForgotPassword);
router.post(
  "/reset-password/:token",
  validation(resetPasswordSchema),
  handleResetPassword
);
export default router;
