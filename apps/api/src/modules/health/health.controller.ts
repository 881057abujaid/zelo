import type { Request, Response } from "express";
import { prisma } from "../../config/prisma.js";

export async function getHealth(_req: Request, res: Response) {
    try {
        await prisma.$queryRaw`SELECT 1`;

        return res.status(200).json({
            success: true,
            message: "ZELO API and database are running",
            data: {
                status: "healthy",
                database: "connected",
                timestamp: new Date().toISOString(),
            },
        });
    } catch {
        return res.status(503).json({
            success: false,
            message: "Database connection is unavailable",
            data: {
                status: "unhealthy",
                database: "disconnected",
                timestamp: new Date().toISOString(),
            },
        });
    }
}