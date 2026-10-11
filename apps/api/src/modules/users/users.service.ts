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