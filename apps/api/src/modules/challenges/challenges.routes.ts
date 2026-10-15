import { Router } from "express";
import {
    getChallenges,
    getChallengeBySlug,
} from "./challenges.controller.js";

const challengesRouter = Router();

challengesRouter.get("/", getChallenges);
challengesRouter.get("/:slug", getChallengeBySlug);

export default challengesRouter;