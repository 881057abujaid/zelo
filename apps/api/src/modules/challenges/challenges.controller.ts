import type { Request, Response } from "express";
import { getPublishedChallenges } from "./challenges.service.js";

export async function getChallenges(
    _req: Request,
    res: Response,
) {
    const challenges = await getPublishedChallenges();

    res.status(200).json({
        success: true,
        message: "Challenges retrieved successfully.",
        data: challenges,
    });
}