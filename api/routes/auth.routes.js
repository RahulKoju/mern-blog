import { Router } from "express";
import {
  handleLoginFailure,
  handleLoginSuccess,
  handleLogout,
  handleSignIn,
  handleSignUp,
} from "../controllers/auth.controller.js";
import passport from "passport";
const router = Router();

router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
// router.get("/login/failed", handleLoginFailure);
// router.get("/login/success", handleLoginSuccess);
// router.get("/logout", handleLogout);
// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: process.env.CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );
//router.get("/google", passport.authenticate("google", ["profile", "email"]));
export default router;
