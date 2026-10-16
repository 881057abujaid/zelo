import type { Response, NextFunction } from "express";

import type { AuthenticatedRequest } from "@/middlewares/auth.middleware.js";

import { updateProfileSchema } from "./users.validation.js";
import { updateUserProfile, getUserProgress } from "./users.service.js";

export async function updateMe(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    const validationResult = updateProfileSchema.safeParse(
        req.body
    );

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationResult.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    try {
        const user = await updateUserProfile(
            req.userId,
            validationResult.data
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: {
                user,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "USERNAME_ALREADY_EXISTS") {
                return res.status(409).json({
                    success: false,
                    message: "Username is already taken.",
                });
            }

            if (error.message === "USER_NOT_FOUND") {
                return res.status(404).json({
                    success: false,
                    message: "User account no longer exists.",
                });
            }
        }

        return next(error);
    }
}

export async function getMyProgress(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    if (!req.userId) {
        return res.status(401).json({
            success: false,
            message: "Authentication required.",
        });
    }

    try {
        const progress = await getUserProgress(req.userId);

        return res.status(200).json({
            success: true,
            message: "User progress retrieved successfully.",
            data: {
                progress,
            },
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "USER_NOT_FOUND"
        ) {
            return res.status(404).json({
                success: false,
                message: "User account no longer exists.",
            });
        }

        return next(error);
    }
}