import { prisma } from "@/config/prisma.js";

export async function getUserAchievements(userId: string) {
    const [achievements, earnedAchievements] = await Promise.all([
        prisma.achievement.findMany({
            where: {
                isPublished: true,
            },
            orderBy: {
                createdAt: "asc",
            },
            select: {
                id: true,
                slug: true,
                title: true,
                description: true,
                icon: true,
                xpRequired: true,
            },
        }),

        prisma.userAchievement.findMany({
            where: {
                userId,
                achievement: {
                    isPublished: true,
                },
            },
            select: {
                achievementId: true,
                earnedAt: true,
            },
        }),
    ]);

    const earnedById = new Map(
        earnedAchievements.map((item) => [
            item.achievementId,
            item.earnedAt,
        ]),
    );

    return achievements.map((achievement) => {
        const earnedAt = earnedById.get(achievement.id);

        return {
            ...achievement,
            isEarned: earnedAt !== undefined,
            earnedAt: earnedAt ?? null,
        };
    });
}