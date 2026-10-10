import bcrypt from "bcrypt";
import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../config/prisma.js";
import type { RegisterInput } from "./auth.validation.js";

const SALT_ROUNDS = 12;

export async function registerUser(input: RegisterInput) {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { username: input.username },
                { email: input.email },
            ],
        },
        select: {
            username: true,
            email: true,
        },
    });

    if (existingUser) {
        if (existingUser.username === input.username) {
            throw new Error("USERNAME_ALREADY_EXISTS");
        }

        if (existingUser.email === input.email) {
            throw new Error("EMAIL_ALREADY_EXISTS");
        }
    }

    const passwordHash = await bcrypt.hash(
        input.password,
        SALT_ROUNDS
    );

    try {
        const user = await prisma.user.create({
            data: {
                username: input.username,
                email: input.email,
                passwordHash,
                ...(input.displayName !== undefined && {
                    displayName: input.displayName,
                }),
            },
            select: {
                id: true,
                username: true,
                email: true,
                displayName: true,
                totalXp: true,
                createdAt: true,
            },
        });

        return user;
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new Error("ACCOUNT_ALREADY_EXISTS");
        }

        throw error;
    }
}