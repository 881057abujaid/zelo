import type { Response } from "express";

import type { AuthenticatedRequest } from "@/middlewares/auth.middleware.js";

import { getUserStreak } from "./streaks.service.js";

export async function getStreak(
    req: AuthenticatedRequest,
    res: Response,
) {
    const userId = req.userId;

    if (!userId) {
        res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
        return;
    }

    const streak = await getUserStreak(userId);

    res.status(200).json({
        success: true,
        message: "Streak retrieved successfully.",
        data: streak,
    });
}