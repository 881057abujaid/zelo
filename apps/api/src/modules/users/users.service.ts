import { Prisma } from "@/generated/prisma/client.js";
import { prisma } from "@/config/prisma.js";

import type { UpdateProfileInput } from "./users.validation.js";

export async function updateUserProfile(
    userId: string,
    input: UpdateProfileInput
) {
    // Check whether the username is already used by another user.
    if (input.username !== undefined) {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: input.username,
            },
            select: {
                id: true,
            },
        });

        if (existingUser && existingUser.id !== userId) {
            throw new Error("USERNAME_ALREADY_EXISTS");
        }
    }

    try {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...(input.username !== undefined && {
                    username: input.username,
                }),

                ...(input.displayName !== undefined && {
                    displayName: input.displayName,
                }),

                ...(input.avatarUrl !== undefined && {
                    avatarUrl: input.avatarUrl,
                }),
            },
            select: {
                id: true,
                username: true,
                email: true,
                displayName: true,
                avatarUrl: true,
                totalXp: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return user;
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
        ) {
            if (error.code === "P2002") {
                throw new Error("USERNAME_ALREADY_EXISTS");
            }

            if (error.code === "P2025") {
                throw new Error("USER_NOT_FOUND");
            }
        }

        throw error;
    }
}

export async function getUserProgress(userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            totalXp: true,
        },
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    const [totalChallenges, completedChallenges, worlds] =
        await Promise.all([
            prisma.challenge.count({
                where: {
                    isPublished: true,
                    world: {
                        isPublished: true,
                    },
                },
            }),

            prisma.userProgress.count({
                where: {
                    userId,
                    isCompleted: true,
                    challenge: {
                        isPublished: true,
                        world: {
                            isPublished: true,
                        },
                    },
                },
            }),

            prisma.world.findMany({
                where: {
                    isPublished: true,
                },
                orderBy: {
                    sortOrder: "asc",
                },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    icon: true,
                    challenges: {
                        where: {
                            isPublished: true,
                        },
                        select: {
                            id: true,
                            progress: {
                                where: {
                                    userId,
                                    isCompleted: true,
                                },
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                },
            }),
        ]);

    const overallProgress =
        totalChallenges === 0
            ? 0
            : Math.round(
                (completedChallenges / totalChallenges) * 100
            );

    const worldProgress = worlds.map((world) => {
        const total = world.challenges.length;

        const completed = world.challenges.filter(
            (challenge) => challenge.progress.length > 0
        ).length;

        return {
            slug: world.slug,
            title: world.title,
            icon: world.icon,
            totalChallenges: total,
            completedChallenges: completed,
            progressPercentage:
                total === 0
                    ? 0
                    : Math.round((completed / total) * 100),
        };
    });

    return {
        totalXp: user.totalXp,
        totalChallenges,
        completedChallenges,
        overallProgress,
        worldProgress,
    };
}