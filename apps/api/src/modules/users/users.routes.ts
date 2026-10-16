import { Router } from "express";

import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { getMyProgress, updateMe } from "./users.controller.js";

const usersRouter = Router();

usersRouter.patch("/me", authMiddleware, updateMe);
usersRouter.get("/me/progress", authMiddleware, getMyProgress);

export default usersRouter;