import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import {
    getChallenges,
    getChallengeBySlug,
    submitChallenge,
} from "./challenges.controller.js";

const challengesRouter = Router();

challengesRouter.get("/", getChallenges);
challengesRouter.get("/:slug", getChallengeBySlug);
challengesRouter.post("/:slug/submit", authMiddleware, submitChallenge);

export default challengesRouter;