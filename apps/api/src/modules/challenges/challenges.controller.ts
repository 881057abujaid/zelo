import type { Request, Response } from "express";
import { getPublishedChallenges, getPublishedChallengeBySlug } from "./challenges.service.js";

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

export async function getChallengeBySlug(
    req: Request,
    res: Response
) {
    const slug = req.params.slug;

    if (typeof slug !== "string") {
        res.status(400).json({
            success: false,
            message: "Invalid challenge slug.",
        });
        return;
    }

    const challenge = await getPublishedChallengeBySlug(slug);

    if (!challenge) {
        res.status(404).json({
            success: false,
            message: "Challenge not found.",
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Challenge retrieved successfully.",
        data: challenge,
    });
}