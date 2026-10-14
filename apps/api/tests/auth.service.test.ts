import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, txMock } = vi.hoisted(() => {
    const txMock = {
        user: {
            findUnique: vi.fn(),
            updateMany: vi.fn(),
        },
        userStreak: {
            upsert: vi.fn(),
        },
    };

    return {
        txMock,
        prismaMock: {
            $transaction: vi.fn(),
        },
    };
});

vi.mock("@/config/prisma.js", () => ({
    prisma: prismaMock,
}));

vi.mock("@/config/env.js", () => ({
    env: {
        JWT_ACCESS_SECRET: "test-secret",
    },
}));

vi.mock("@/generated/prisma/client.js", () => ({
    Prisma: {
        PrismaClientKnownRequestError: class PrismaClientKnownRequestError
            extends Error {
            code: string;

            constructor(code: string) {
                super("Mock Prisma error");
                this.code = code;
            }
        },
    },
}));

import { completeUserOnboarding } from "../src/modules/auth/auth.service";

describe("completeUserOnboarding", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        prismaMock.$transaction.mockImplementation(
            async (callback: (tx: typeof txMock) => Promise<unknown>) =>
                callback(txMock),
        );
    });

    it("should complete onboarding and initialize streak to 1", async () => {
        const userId = "user-123";

        txMock.user.findUnique
            .mockResolvedValueOnce({
                id: userId,
                isOnboardingComplete: false,
            })
            .mockResolvedValueOnce({
                id: userId,
                isOnboardingComplete: true,
            });

        txMock.user.updateMany.mockResolvedValue({
            count: 1,
        });

        txMock.userStreak.upsert.mockResolvedValue({
            userId,
            currentStreak: 1,
            longestStreak: 1,
        });

        const result = await completeUserOnboarding(userId);

        expect(result).toEqual({
            id: userId,
            isOnboardingComplete: true,
        });

        expect(txMock.user.updateMany).toHaveBeenCalledWith({
            where: {
                id: userId,
                isOnboardingComplete: false,
            },
            data: {
                isOnboardingComplete: true,
            },
        });

        expect(txMock.userStreak.upsert).toHaveBeenCalledWith({
            where: { userId },
            create: {
                userId,
                currentStreak: 1,
                longestStreak: 1,
                lastActivityAt: expect.any(Date),
            },
            update: {},
        });
    });

    it("should not initialize streak again when onboarding is already complete", async () => {
        const userId = "user-123";

        txMock.user.findUnique.mockResolvedValue({
            id: userId,
            isOnboardingComplete: true,
        });

        const result = await completeUserOnboarding(userId);

        expect(result).toEqual({
            id: userId,
            isOnboardingComplete: true,
        });

        expect(txMock.user.updateMany).not.toHaveBeenCalled();
        expect(txMock.userStreak.upsert).not.toHaveBeenCalled();
    });

    it("should throw USER_NOT_FOUND when the user does not exist", async () => {
        txMock.user.findUnique.mockResolvedValue(null);

        await expect(
            completeUserOnboarding("missing-user"),
        ).rejects.toThrow("USER_NOT_FOUND");

        expect(txMock.user.updateMany).not.toHaveBeenCalled();
        expect(txMock.userStreak.upsert).not.toHaveBeenCalled();
    });

    it("should propagate a transaction failure", async () => {
        prismaMock.$transaction.mockRejectedValue(
            new Error("DATABASE_FAILURE"),
        );

        await expect(
            completeUserOnboarding("user-123"),
        ).rejects.toThrow("DATABASE_FAILURE");
    });

    it("should not initialize streak when conditional update affects no rows", async () => {
        const userId = "user-123";

        txMock.user.findUnique
            .mockResolvedValueOnce({
                id: userId,
                isOnboardingComplete: false,
            })
            .mockResolvedValueOnce({
                id: userId,
                isOnboardingComplete: true,
            });

        txMock.user.updateMany.mockResolvedValue({
            count: 0,
        });

        const result = await completeUserOnboarding(userId);

        expect(result).toEqual({
            id: userId,
            isOnboardingComplete: true,
        });

        expect(txMock.userStreak.upsert).not.toHaveBeenCalled();
    });
});