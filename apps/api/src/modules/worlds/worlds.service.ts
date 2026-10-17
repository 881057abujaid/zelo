import { prisma } from "@/config/prisma.js";

export async function getPublishedWorlds() {
    return prisma.world.findMany({
        where: {
            isPublished: true,
        },
        select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            imageUrl: true,
            sortOrder: true,
        },
        orderBy: {
            sortOrder: "asc",
        },
    });
}

export async function getPublishedWorldChallenges(slug: string) {
    const world = await prisma.world.findFirst({
        where: {
            slug,
            isPublished: true,
        },
        select: {
            id: true,
            challenges: {
                where: {
                    isPublished: true,
                },
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    description: true,
                    instructions: true,
                    difficulty: true,
                    xpReward: true,
                    orderIndex: true,
                },
                orderBy: {
                    orderIndex: "asc",
                },
            },
        },
    });

    return world;
}