import type { Request, Response } from "express";
import { getPublishedWorlds, getPublishedWorldChallenges } from "./worlds.service.js";

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