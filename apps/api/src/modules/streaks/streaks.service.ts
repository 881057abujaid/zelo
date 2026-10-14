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