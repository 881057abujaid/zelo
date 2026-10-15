import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, txMock } = vi.hoisted(() => {
    const txMock = {
        $queryRaw: vi.fn(),
        userStreak: {
            findUnique: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
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

import { recordStreakActivity } from "../src/modules/streaks/streaks.service";

describe("recordStreakActivity", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        txMock.$queryRaw.mockResolvedValue([]);

        prismaMock.$transaction.mockImplementation(
            async (callback: (tx: typeof txMock) => Promise<unknown>) =>
                callback(txMock),
        );
    });

    it("should create a streak with value 1 when no streak exists", async () => {
        const userId = "user-123";

        txMock.userStreak.findUnique.mockResolvedValue(null);

        txMock.userStreak.create.mockImplementation(
            async ({ data }) => data,
        );

        const result = await recordStreakActivity(userId);

        expect(result.currentStreak).toBe(1);
        expect(result.longestStreak).toBe(1);
        expect(result.lastActivityAt).toEqual(expect.any(Date));

        expect(txMock.userStreak.create).toHaveBeenCalledWith({
            data: {
                userId,
                currentStreak: 1,
                longestStreak: 1,
                lastActivityAt: expect.any(Date),
            },
            select: {
                currentStreak: true,
                longestStreak: true,
                lastActivityAt: true,
            },
        });
    });

    it("should not increase the streak when activity is recorded on the same day", async () => {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const existingStreak = {
            currentStreak: 3,
            longestStreak: 5,
            lastActivityAt: today,
        };

        txMock.userStreak.findUnique.mockResolvedValue(existingStreak);

        const result = await recordStreakActivity("user-123");

        expect(result).toEqual(existingStreak);
        expect(txMock.userStreak.create).not.toHaveBeenCalled();
        expect(txMock.userStreak.update).not.toHaveBeenCalled();
    });

    it("should increment the streak when the last activity was yesterday", async () => {
        const yesterday = new Date();
        yesterday.setUTCHours(0, 0, 0, 0);
        yesterday.setUTCDate(yesterday.getUTCDate() - 1);

        txMock.userStreak.findUnique.mockResolvedValue({
            currentStreak: 3,
            longestStreak: 3,
            lastActivityAt: yesterday,
        });

        txMock.userStreak.update.mockImplementation(
            async ({ data }) => data,
        );

        const result = await recordStreakActivity("user-123");

        expect(result.currentStreak).toBe(4);
        expect(result.longestStreak).toBe(4);
        expect(result.lastActivityAt).toEqual(expect.any(Date));

        expect(txMock.userStreak.update).toHaveBeenCalledWith({
            where: {
                userId: "user-123",
            },
            data: {
                currentStreak: 4,
                longestStreak: 4,
                lastActivityAt: expect.any(Date),
            },
            select: {
                currentStreak: true,
                longestStreak: true,
                lastActivityAt: true,
            },
        });
    });

    it("should reset the current streak after a missed day", async () => {
        const twoDaysAgo = new Date();
        twoDaysAgo.setUTCHours(0, 0, 0, 0);
        twoDaysAgo.setUTCDate(twoDaysAgo.getUTCDate() - 2);

        txMock.userStreak.findUnique.mockResolvedValue({
            currentStreak: 4,
            longestStreak: 7,
            lastActivityAt: twoDaysAgo,
        });

        txMock.userStreak.update.mockImplementation(
            async ({ data }) => data,
        );

        const result = await recordStreakActivity("user-123");

        expect(result.currentStreak).toBe(1);
        expect(result.longestStreak).toBe(7);
    });

    it("should initialize the current streak when lastActivityAt is null", async () => {
        txMock.userStreak.findUnique.mockResolvedValue({
            currentStreak: 0,
            longestStreak: 5,
            lastActivityAt: null,
        });

        txMock.userStreak.update.mockImplementation(
            async ({ data }) => data,
        );

        const result = await recordStreakActivity("user-123");

        expect(result.currentStreak).toBe(1);
        expect(result.longestStreak).toBe(5);
        expect(result.lastActivityAt).toEqual(expect.any(Date));
    });

    it("should propagate transaction failures", async () => {
        prismaMock.$transaction.mockRejectedValue(
            new Error("DATABASE_FAILURE"),
        );

        await expect(
            recordStreakActivity("user-123"),
        ).rejects.toThrow("DATABASE_FAILURE");
    });
});