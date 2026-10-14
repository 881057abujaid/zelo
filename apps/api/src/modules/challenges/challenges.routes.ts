import { Router } from "express";
import { getChallenges } from "./challenges.controller.js";

const challengesRouter = Router();

challengesRouter.get("/", getChallenges);

export default challengesRouter;