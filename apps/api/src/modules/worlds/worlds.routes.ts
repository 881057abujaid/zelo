import { Router } from "express";
import {
    getWorldChallenges,
    getWorlds,
} from "./worlds.controller.js";

const worldsRouter = Router();

worldsRouter.get("/", getWorlds);
worldsRouter.get("/:slug/challenges", getWorldChallenges);

export default worldsRouter;