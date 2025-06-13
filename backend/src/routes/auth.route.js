import { Router } from "express";
import { validateLogin, validateSignUp } from "../middleware/auth.middleware.js";
import { logIn, logout, register } from "../controllers/auth.controller.js";
const router = Router();

router.route("/signup").post(validateSignUp,register);
router.route("/login").post(validateLogin,logIn);
router.route("/logout").post(logout);
export default router;