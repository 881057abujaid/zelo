import { afterEach, describe, expect, it, vi } from "vitest";

import { api } from "@/lib/api";
import { getServerProgress } from "./serverProgress.service";

import type { ServerProgress } from "./serverProgress.service";

vi.mock("@/lib/api", () => ({
    api: {
        get: vi.fn(),
    },
}));

const mockServerProgress: ServerProgress = {
    totalXp: 250,
    totalChallenges: 20,
    completedChallenges: 5,
    overallProgress: 25,
    worldProgress: [
        {
            slug: "javascript",
            title: "JavaScript Foundations",
            imageUrl: "https://example.com/javascript.png",
            totalChallenges: 20,
            completedChallenges: 5,
            progressPercentage: 25,
        },
    ],
};

describe("getServerProgress", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should fetch and return server progress", async () => {
        vi.mocked(api.get).mockResolvedValue({
            data: {
                success: true,
                message: "User progress retrieved successfully.",
                data: {
                    progress: mockServerProgress,
                },
            },
        } as never);

        const result = await getServerProgress();

        expect(api.get).toHaveBeenCalledWith(
            "/users/me/progress",
        );

        expect(result).toEqual(mockServerProgress);
    });

    it("should return empty world progress when the server has no worlds", async () => {
        const emptyProgress: ServerProgress = {
            ...mockServerProgress,
            totalXp: 0,
            totalChallenges: 0,
            completedChallenges: 0,
            overallProgress: 0,
            worldProgress: [],
        };

        vi.mocked(api.get).mockResolvedValue({
            data: {
                success: true,
                message: "Progress fetched successfully",
                data: {
                    progress: emptyProgress,
                },
            },
        } as never);

        const result = await getServerProgress();

        expect(result.worldProgress).toEqual([]);
        expect(result.totalXp).toBe(0);
        expect(result.overallProgress).toBe(0);
    });

    it("should propagate API errors to the caller", async () => {
        const error = new Error("Network error");

        vi.mocked(api.get).mockRejectedValue(error);

        await expect(getServerProgress()).rejects.toThrow(
            "Network error",
        );
    });
});
