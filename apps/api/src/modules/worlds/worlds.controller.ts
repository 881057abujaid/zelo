import type { Request, Response } from "express";
import { getPublishedWorlds } from "./worlds.service.js";

export async function getWorlds(_req: Request, res: Response) {
    const worlds = await getPublishedWorlds();

    res.status(200).json({
        success: true,
        message: "Worlds retrieved successfully.",
        data: worlds,
    });
}