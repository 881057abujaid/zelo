import express from "express";
import cors from "cors";
import helmet from "helmet";

import healthRouter from "./modules/health/health.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import usersRouter from "./modules/users/users.routes.js";
import streaksRouter from "./modules/streaks/streaks.routes.js";
import challengesRouter from "./modules/challenges/challenges.routes.js";
import worldsRouter from "./modules/worlds/worlds.routes.js";

import {
    errorHandler,
    notFoundHandler,
} from "./middlewares/error.middleware.js";

const app = express();

app.disable("x-powered-by");

app.use(helmet());

app.use(
    cors({
        origin: process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(",").map(
                (origin) => origin.trim()
            )
            : false,
    })
);

app.use(express.json({ limit: "100kb" }));

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Welcome to ZELO API",
    });
});

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/streaks", streaksRouter);
app.use("/api/v1/challenges", challengesRouter);
app.use("/api/v1/worlds", worldsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;