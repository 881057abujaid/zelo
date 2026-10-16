import type { Request, Response, NextFunction } from "express";
import { getUserAchievements } from "./achievements.service.js";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export async function getMyAchievements(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction,
): Promise<void> {
    try {
        if (!req.userId) {
            res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
            return;
        }

        const achievements = await getUserAchievements(req.userId);

        res.status(200).json({
            success: true,
            message: "Achievements retrieved successfully.",
            data: {
                achievements,
            },
        });
    } catch (error) {
        next(error);
    }
}