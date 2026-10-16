import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/config/prisma.js", () => ({
    prisma: {
        achievement: {
            findMany: vi.fn(),
        },
        userAchievement: {
            findMany: vi.fn(),
        },
    },
}));

import { prisma } from "../src/config/prisma.js";
import { getUserAchievements } from "../src/modules/achievements/achievements.service.js";

describe("getUserAchievements", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return achievements with earned status", async () => {
        vi.mocked(prisma.achievement.findMany).mockResolvedValue([
            {
                id: "achievement-1",
                slug: "first-code",
                title: "First Code",
                description: "Complete your first coding challenge.",
                icon: "🏆",
                xpRequired: null,
            },
            {
                id: "achievement-2",
                slug: "bug-hunter",
                title: "Bug Hunter",
                description: "Find and fix bugs.",
                icon: "🐛",
                xpRequired: 100,
            },
        ] as never);

        const earnedAt = new Date("2026-10-16T10:00:00.000Z");

        vi.mocked(prisma.userAchievement.findMany).mockResolvedValue([
            {
                achievementId: "achievement-1",
                earnedAt,
            },
        ] as never);

        const result = await getUserAchievements("user-1");

        expect(result).toHaveLength(2);

        expect(result[0]).toMatchObject({
            slug: "first-code",
            isEarned: true,
            earnedAt,
        });

        expect(result[1]).toMatchObject({
            slug: "bug-hunter",
            isEarned: false,
            earnedAt: null,
        });

        expect(prisma.achievement.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { isPublished: true },
            }),
        );

        expect(prisma.userAchievement.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: {
                    userId: "user-1",
                    achievement: { isPublished: true },
                },
            }),
        );
    });

    it("should return an empty array when no achievements exist", async () => {
        vi.mocked(prisma.achievement.findMany).mockResolvedValue([]);
        vi.mocked(prisma.userAchievement.findMany).mockResolvedValue([]);

        const result = await getUserAchievements("user-1");

        expect(result).toEqual([]);
    });
});