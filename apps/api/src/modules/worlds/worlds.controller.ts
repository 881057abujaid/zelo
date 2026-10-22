import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedRequest } from "@/middlewares/auth.middleware.js";
import { getPublishedWorlds, getPublishedWorldChallenges, getPublishedWorldChallengesForUser } from "./worlds.service.js";

export async function getWorlds(_req: Request, res: Response) {
    const worlds = await getPublishedWorlds();

    res.status(200).json({
        success: true,
        message: "Worlds retrieved successfully.",
        data: worlds,
    });
}

export async function getWorldChallenges(
    req: Request,
    res: Response
) {
    const slug = req.params.slug;

    if (typeof slug !== "string") {
        res.status(400).json({
            success: false,
            message: "Invalid world slug.",
        });
        return;
    }

    const world = await getPublishedWorldChallenges(slug);

    if (!world) {
        res.status(404).json({
            success: false,
            message: "World not found.",
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "World challenges retrieved successfully.",
        data: world.challenges,
    });
}

export async function getMyWorldChallenges(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
) {
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    const slug = req.params.slug;

    if (typeof slug !== "string") {
        return res.status(400).json({
            success: false,
            message: "Invalid world slug.",
        });
    }

    try {
        const challenges = await getPublishedWorldChallengesForUser(
            slug,
            req.userId,
        );

        if (!challenges) {
            return res.status(404).json({
                success: false,
                message: "World not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "World challenge progress retrieved successfully.",
            data: challenges,
        });
    } catch (error) {
        return next(error);
    }
}