import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock } = vi.hoisted(() => ({
    prismaMock: {
        user: {
            findUnique: vi.fn(),
        },
        challenge: {
            count: vi.fn(),
        },
        userProgress: {
            count: vi.fn(),
        },
        world: {
            findMany: vi.fn(),
        },
    },
}));

vi.mock("@/config/prisma.js", () => ({
    prisma: prismaMock,
}));

import { getUserProgress } from "../src/modules/users/users.service";

describe("getUserProgress", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns user progress and world-wise statistics", async () => {
        prismaMock.user.findUnique.mockResolvedValue({
            id: "user-123",
            totalXp: 50,
        });

        prismaMock.challenge.count.mockResolvedValue(10);
        prismaMock.userProgress.count.mockResolvedValue(4);

        prismaMock.world.findMany.mockResolvedValue([
            {
                id: "world-1",
                slug: "frontend",
                title: "Frontend World",
                icon: "🌐",
                challenges: [
                    { id: "challenge-1", progress: [{ id: "progress-1" }] },
                    { id: "challenge-2", progress: [] },
                    { id: "challenge-3", progress: [{ id: "progress-2" }] },
                    { id: "challenge-4", progress: [] },
                ],
            },
        ]);

        const result = await getUserProgress("user-123");

        expect(result).toEqual({
            totalXp: 50,
            totalChallenges: 10,
            completedChallenges: 4,
            overallProgress: 40,
            worldProgress: [
                {
                    slug: "frontend",
                    title: "Frontend World",
                    icon: "🌐",
                    totalChallenges: 4,
                    completedChallenges: 2,
                    progressPercentage: 50,
                },
            ],
        });
    });

    it("returns zero progress when there are no published challenges", async () => {
        prismaMock.user.findUnique.mockResolvedValue({
            id: "user-123",
            totalXp: 0,
        });

        prismaMock.challenge.count.mockResolvedValue(0);
        prismaMock.userProgress.count.mockResolvedValue(0);
        prismaMock.world.findMany.mockResolvedValue([]);

        const result = await getUserProgress("user-123");

        expect(result).toEqual({
            totalXp: 0,
            totalChallenges: 0,
            completedChallenges: 0,
            overallProgress: 0,
            worldProgress: [],
        });
    });

    it("throws USER_NOT_FOUND when the user does not exist", async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        await expect(
            getUserProgress("missing-user"),
        ).rejects.toThrow("USER_NOT_FOUND");

        expect(prismaMock.challenge.count).not.toHaveBeenCalled();
        expect(prismaMock.userProgress.count).not.toHaveBeenCalled();
        expect(prismaMock.world.findMany).not.toHaveBeenCalled();
    });
});