import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../src/middlewares/auth.middleware.js";

const { getUserProgressMock } = vi.hoisted(() => ({
    getUserProgressMock: vi.fn(),
}));

vi.mock("../src/modules/users/users.service.js", () => ({
    getUserProgress: getUserProgressMock,
    updateUserProfile: vi.fn(),
}));

import { getMyProgress } from "../src/modules/users/users.controller.js";

function createMocks(userId?: string) {
    const req = {
        userId,
    } as AuthenticatedRequest;

    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as Response;

    const next = vi.fn() as NextFunction;

    return { req, res, next };
}

describe("getMyProgress", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns progress for an authenticated user", async () => {
        getUserProgressMock.mockResolvedValue({
            totalXp: 50,
            totalChallenges: 10,
            completedChallenges: 4,
            overallProgress: 40,
            worldProgress: [],
        });

        const { req, res, next } = createMocks("user-123");

        await getMyProgress(req, res, next);

        expect(getUserProgressMock).toHaveBeenCalledWith("user-123");

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: "User progress retrieved successfully.",
            data: {
                progress: {
                    totalXp: 50,
                    totalChallenges: 10,
                    completedChallenges: 4,
                    overallProgress: 40,
                    worldProgress: [],
                },
            },
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("returns 401 when the user is not authenticated", async () => {
        const { req, res, next } = createMocks();

        await getMyProgress(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);

        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Authentication required.",
        });

        expect(getUserProgressMock).not.toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    it("returns 404 when the user no longer exists", async () => {
        getUserProgressMock.mockRejectedValue(
            new Error("USER_NOT_FOUND"),
        );

        const { req, res, next } = createMocks("user-123");

        await getMyProgress(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);

        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "User account no longer exists.",
        });

        expect(next).not.toHaveBeenCalled();
    });

    it("forwards unexpected errors to the error handler", async () => {
        const error = new Error("Database connection failed");

        getUserProgressMock.mockRejectedValue(error);

        const { req, res, next } = createMocks("user-123");

        await getMyProgress(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});