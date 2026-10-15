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
            icon: true,
            sortOrder: true,
        },
        orderBy: {
            sortOrder: "asc",
        },
    });
}