import { prisma } from "@/config/prisma.js";

export async function getPublishedChallenges() {
    const challenges = await prisma.challenge.findMany({
        where: {
            isPublished: true,
            world: {
                isPublished: true,
            },
        },
        select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            difficulty: true,
            xpReward: true,
            orderIndex: true,
            world: {
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    icon: true,
                },
            },
        },
        orderBy: [
            {
                world: {
                    sortOrder: "asc",
                },
            },
            {
                orderIndex: "asc",
            },
        ],
    });

    return challenges;
}

export async function getPublishedChallengeBySlug(slug: string) {
    const challenge = await prisma.challenge.findFirst({
        where: {
            slug,
            isPublished: true,
            world: {
                isPublished: true,
            },
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
            world: {
                select: {
                    id: true,
                    slug: true,
                    title: true,
                    icon: true,
                },
            },
        },
    });

    return challenge;
}