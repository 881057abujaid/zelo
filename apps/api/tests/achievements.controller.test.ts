import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";

vi.mock("@/modules/achievements/achievements.service.js", () => ({
    getUserAchievements: vi.fn(),
}));

import { getUserAchievements } from "../src/modules/achievements/achievements.service.js";
import { getMyAchievements } from "../src/modules/achievements/achievements.controller.js";

describe("getMyAchievements", () => {
    const mockStatus = vi.fn();
    const mockJson = vi.fn();
    const mockNext = vi.fn();

    const mockResponse = {
        status: mockStatus,
        json: mockJson,
    } as unknown as Response;

    const mockNextFunction = mockNext as unknown as NextFunction;

    beforeEach(() => {
        vi.clearAllMocks();
        mockStatus.mockReturnValue(mockResponse);
        mockJson.mockReturnValue(mockResponse);
    });

    it("should return 401 when user is not authenticated", async () => {
        const req = {
            userId: undefined,
        } as Request & { userId?: string };

        await getMyAchievements(
            req,
            mockResponse,
            mockNextFunction,
        );

        expect(mockStatus).toHaveBeenCalledWith(401);
        expect(mockJson).toHaveBeenCalledWith({
            success: false,
            message: "Authentication required.",
        });

        expect(getUserAchievements).not.toHaveBeenCalled();
    });

    it("should return achievements when user is authenticated", async () => {
        const achievements = [
            {
                id: "achievement-1",
                slug: "first-code",
                title: "First Code",
                description: "Complete your first challenge.",
                icon: "🏆",
                xpRequired: null,
                isEarned: true,
                earnedAt: new Date("2026-10-16T10:00:00.000Z"),
            },
        ];

        vi.mocked(getUserAchievements).mockResolvedValue(achievements);

        const req = {
            userId: "user-1",
        } as Request & { userId?: string };

        await getMyAchievements(
            req,
            mockResponse,
            mockNextFunction,
        );

        expect(getUserAchievements).toHaveBeenCalledWith("user-1");
        expect(mockStatus).toHaveBeenCalledWith(200);

        expect(mockJson).toHaveBeenCalledWith({
            success: true,
            message: "Achievements retrieved successfully.",
            data: {
                achievements,
            },
        });

        expect(mockNext).not.toHaveBeenCalled();
    });

    it("should forward unexpected errors to error middleware", async () => {
        const error = new Error("Database connection failed");

        vi.mocked(getUserAchievements).mockRejectedValue(error);

        const req = {
            userId: "user-1",
        } as Request & { userId?: string };

        await getMyAchievements(
            req,
            mockResponse,
            mockNextFunction,
        );

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});