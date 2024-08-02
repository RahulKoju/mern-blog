import { Router } from "express";
import {
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "../controllers/auth.controller.js";
const router = Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.post("/signout", handleSignOut);
export default router;
