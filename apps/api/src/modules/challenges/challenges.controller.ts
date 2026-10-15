import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "@/middlewares/auth.middleware.js";
import { getPublishedChallenges, getPublishedChallengeBySlug } from "./challenges.service.js";
import { submitHtmlChallenge } from "./challenge-submission.service.js";

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

export async function submitChallenge(
    req: AuthenticatedRequest,
    res: Response,
) {
    const slug = req.params.slug;

    if (typeof slug !== "string") {
        res.status(400).json({
            success: false,
            message: "Invalid challenge slug.",
        });
        return;
    }

    const userId = req.userId;

    if (!userId) {
        res.status(401).json({
            success: false,
            message: "Authentication is required.",
        });
        return;
    }

    const body: unknown = req.body;

    if (
        typeof body !== "object" ||
        body === null ||
        Array.isArray(body)
    ) {
        res.status(400).json({
            success: false,
            message: "Request body must be a JSON object.",
        });
        return;
    }

    const { submission } = body as {
        submission?: unknown;
    };

    if (
        typeof submission !== "string" ||
        submission.trim().length === 0
    ) {
        res.status(400).json({
            success: false,
            message: "Submission must be a non-empty string.",
        });
        return;
    }

    if (submission.length > 50_000) {
        res.status(413).json({
            success: false,
            message: "Submission exceeds the maximum allowed size.",
        });
        return;
    }

    const result = await submitHtmlChallenge(
        userId,
        slug,
        submission,
    );

    if (!result.success) {
        res.status(404).json({
            success: false,
            message: "Challenge not found.",
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: result.evaluation.passed
            ? "Challenge completed successfully!"
            : "Some requirements are not satisfied yet.",
        data: result,
    });
}