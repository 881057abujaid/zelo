import { Router } from "express";

import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { updateMe } from "./users.controller.js";

const usersRouter = Router();

usersRouter.patch("/me", authMiddleware, updateMe);

export default usersRouter;