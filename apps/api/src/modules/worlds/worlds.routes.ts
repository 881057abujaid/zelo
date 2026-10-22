import { Router } from "express";
import {
    getMyWorldChallenges,
    getWorldChallenges,
    getWorlds,
} from "./worlds.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const worldsRouter = Router();

worldsRouter.get("/", getWorlds);
worldsRouter.get("/:slug/progress", authMiddleware, getMyWorldChallenges);
worldsRouter.get("/:slug/challenges", getWorldChallenges);

export default worldsRouter;