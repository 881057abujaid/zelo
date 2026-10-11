import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { env } from "@/config/env.js";

export interface AuthenticatedRequest extends Request {
    userId?: string;
    username?: string;
}

interface AccessTokenPayload extends jwt.JwtPayload {
    sub: string;
    username: string;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authRequest = req as AuthenticatedRequest;
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Authentication token is required.",
        });
        return;
    }

    const token = authorization.slice("Bearer ".length).trim();

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Authentication token is required.",
        });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            env.JWT_ACCESS_SECRET,
            {
                issuer: "zelo-api",
                audience: "zelo-mobile",
                algorithms: ["HS256"],
            }
        );

        if (
            typeof decoded === "string" ||
            typeof decoded.sub !== "string" ||
            typeof decoded.username !== "string"
        ) {
            res.status(401).json({
                success: false,
                message: "Invalid authentication token.",
            });
            return;
        }

        const payload = decoded as AccessTokenPayload;

        authRequest.userId = payload.sub;
        authRequest.username = payload.username;

        next();
    } catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired authentication token.",
        });
    }
}