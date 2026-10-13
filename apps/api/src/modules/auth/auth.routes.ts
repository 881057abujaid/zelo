import { Router } from "express";
import { register, login, getMe, completeOnboarding } from "@/modules/auth/auth.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", authMiddleware, getMe);
authRouter.patch("/onboarding/complete", authMiddleware, completeOnboarding);

export default authRouter;