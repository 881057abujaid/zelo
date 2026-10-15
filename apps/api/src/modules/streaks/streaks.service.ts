import { prisma } from "@/config/prisma.js";

export async function getUserStreak(userId: string) {
    const streak = await prisma.userStreak.findUnique({
        where: {
            userId,
        },
        select: {
            currentStreak: true,
            longestStreak: true,
            lastActivityAt: true,
        },
    });

    return (
        streak ?? {
            currentStreak: 0,
            longestStreak: 0,
            lastActivityAt: null,
        }
    );
}

export async function recordStreakActivity(userId: string) {
    return prisma.$transaction(async (tx) => {
        await tx.$queryRaw`
            SELECT id
            FROM "User"
            WHERE id = ${userId}::uuid
            FOR UPDATE
        `;

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);

        const streak = await tx.userStreak.findUnique({
            where: {
                userId,
            },
            select: {
                currentStreak: true,
                longestStreak: true,
                lastActivityAt: true,
            },
        });

        if (!streak) {
            return tx.userStreak.create({
                data: {
                    userId,
                    currentStreak: 1,
                    longestStreak: 1,
                    lastActivityAt: today,
                },
                select: {
                    currentStreak: true,
                    longestStreak: true,
                    lastActivityAt: true,
                },
            });
        }

        if (streak.lastActivityAt === null) {
            return tx.userStreak.update({
                where: {
                    userId,
                },
                data: {
                    currentStreak: 1,
                    longestStreak: Math.max(streak.longestStreak, 1),
                    lastActivityAt: today,
                },
                select: {
                    currentStreak: true,
                    longestStreak: true,
                    lastActivityAt: true,
                },
            });
        }

        const lastActivity = new Date(streak.lastActivityAt);
        lastActivity.setUTCHours(0, 0, 0, 0);

        if (lastActivity.getTime() === today.getTime()) {
            return streak;
        }

        const isConsecutiveDay =
            lastActivity.getTime() === yesterday.getTime();

        const currentStreak = isConsecutiveDay
            ? streak.currentStreak + 1
            : 1;

        const longestStreak = Math.max(
            streak.longestStreak,
            currentStreak,
        );

        return tx.userStreak.update({
            where: {
                userId,
            },
            data: {
                currentStreak,
                longestStreak,
                lastActivityAt: today,
            },
            select: {
                currentStreak: true,
                longestStreak: true,
                lastActivityAt: true,
            },
        });
    });
}