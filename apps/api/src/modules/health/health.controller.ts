import type { Request, Response } from "express";

export function getHealth(_req: Request, res: Response) {
    res.status(200).json({
        success: true,
        message: "ZELO API is running",
        data: {
            status: "healthy",
            timestamp: new Date().toISOString(),
        },
    });
}