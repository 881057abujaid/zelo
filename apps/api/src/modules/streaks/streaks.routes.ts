import { Router } from "express";

import { authMiddleware } from "@/middlewares/auth.middleware.js";

import { getStreak } from "./streaks.controller.js";

const streaksRouter = Router();

streaksRouter.get("/", authMiddleware, getStreak);

export default streaksRouter;