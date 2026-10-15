import { Router } from "express";
import { getWorlds } from "./worlds.controller.js";

const worldsRouter = Router();

worldsRouter.get("/", getWorlds);

export default worldsRouter;