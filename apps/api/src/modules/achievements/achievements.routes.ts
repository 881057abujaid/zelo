import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { getMyAchievements } from "./achievements.controller.js";

const achievementsRouter = Router();

achievementsRouter.get("/", authMiddleware, getMyAchievements);

export default achievementsRouter;