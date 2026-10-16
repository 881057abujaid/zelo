import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, evaluateHtmlMock, txMock } = vi.hoisted(() => {
    const txMock = {
        userProgress: {
            findUnique: vi.fn(),
            upsert: vi.fn(),
            count: vi.fn(),
        },
        challengeAttempt: {
            create: vi.fn(),
        },
        user: {
            update: vi.fn(),
        },
        achievement: {
            findMany: vi.fn(),
        },
        userAchievement: {
            findMany: vi.fn(),
            createMany: vi.fn(),
        },
    };

    return {
        txMock,
        evaluateHtmlMock: vi.fn(),
        prismaMock: {
            challenge: {
                findFirst: vi.fn(),
            },
            challengeTestCase: {
                findMany: vi.fn(),
            },
            challengeAttempt: {
                create: vi.fn(),
            },
            userProgress: {
                findUnique: vi.fn(),
                upsert: vi.fn(),
            },
            user: {
                update: vi.fn(),
            },
            $transaction: vi.fn(
                async (callback: (tx: typeof txMock) => Promise<unknown>) =>
                    callback(txMock),
            ),
        },
    };
});

vi.mock("@/config/prisma.js", () => ({
    prisma: prismaMock,
}));

vi.mock("@/modules/challenges/html-evaluator.service.js", () => ({
    evaluateHtml: evaluateHtmlMock,
}));

import { submitHtmlChallenge } from "../src/modules/challenges/challenge-submission.service";

describe("submitHtmlChallenge", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        prismaMock.$transaction.mockImplementation(
            async (callback) => callback(txMock),
        );

        txMock.userProgress.findUnique.mockResolvedValue(null);

        txMock.userProgress.upsert.mockResolvedValue({});
        txMock.userProgress.count.mockResolvedValue(1);
        txMock.user.update.mockResolvedValue({});
        txMock.achievement.findMany.mockResolvedValue([]);
        txMock.userAchievement.findMany.mockResolvedValue([]);
        txMock.userAchievement.createMany.mockResolvedValue({ count: 0 });

        txMock.challengeAttempt.create.mockResolvedValue({
            id: "attempt-123",
            status: "PASSED",
            executedAt: new Date("2026-10-15T10:00:00.000Z"),
        });
    });

    const challenge = {
        id: "challenge-123",
        slug: "first-html-element",
        title: "Meet Your First HTML Element",
        difficulty: "EASY",
        xpReward: 10,
        world: {
            slug: "frontend",
            title: "Frontend World",
        },
    };

    const testCases = [
        {
            id: "test-visible",
            title: "Contains an HTML heading",
            input: { requiredElement: "h1" },
            expected: { containsElement: "h1" },
            isHidden: false,
            orderIndex: 1,
        },
        {
            id: "test-hidden",
            title: "Hidden heading check",
            input: { requiredElement: "h2" },
            expected: { containsElement: "h2" },
            isHidden: true,
            orderIndex: 2,
        },
    ];

    it("returns CHALLENGE_NOT_FOUND when the challenge is unavailable", async () => {
        prismaMock.challenge.findFirst.mockResolvedValue(null);

        const result = await submitHtmlChallenge(
            "user-123",
            "missing-challenge",
            "<h1>Hello</h1>",
        );

        expect(result).toEqual({
            success: false,
            reason: "CHALLENGE_NOT_FOUND",
        });

        expect(prismaMock.challengeTestCase.findMany).not.toHaveBeenCalled();
        expect(prismaMock.challengeAttempt.create).not.toHaveBeenCalled();
    });

    it("saves a PASSED attempt when all checks pass", async () => {
        prismaMock.challenge.findFirst.mockResolvedValue(challenge);
        prismaMock.challengeTestCase.findMany.mockResolvedValue(testCases);

        evaluateHtmlMock.mockReturnValue({
            passed: true,
            totalTests: 2,
            passedTests: 2,
            failedTests: 0,
            checks: [
                {
                    testCaseId: "test-visible",
                    title: "Contains an HTML heading",
                    passed: true,
                    message: "All requirements satisfied.",
                },
                {
                    testCaseId: "test-hidden",
                    title: "Hidden heading check",
                    passed: true,
                    message: "All requirements satisfied.",
                },
            ],
        });

        txMock.challengeAttempt.create.mockResolvedValue({
            id: "attempt-123",
            status: "PASSED",
            executedAt: new Date("2026-10-15T10:00:00.000Z"),
        });

        const submission = "<h1>Hello</h1>";

        const result = await submitHtmlChallenge(
            "user-123",
            "first-html-element",
            submission,
        );

        expect(result.success).toBe(true);

        if (!result.success) {
            throw new Error("Expected submission to succeed.");
        }

        expect(result.attempt.status).toBe("PASSED");

        expect(txMock.userProgress.upsert).toHaveBeenCalledWith(
            expect.objectContaining({
                where: {
                    userId_challengeId: {
                        userId: "user-123",
                        challengeId: "challenge-123",
                    },
                },
                create: expect.objectContaining({
                    isCompleted: true,
                    xpEarned: 10,
                }),
            }),
        );

        expect(txMock.user.update).toHaveBeenCalledWith({
            where: {
                id: "user-123",
            },
            data: {
                totalXp: {
                    increment: 10,
                },
            },
        });

        expect(result.progress).toEqual({
            isCompleted: true,
            xpAwarded: 10,
        });

        expect(result.evaluation.checks).toHaveLength(1);
        expect(result.evaluation.checks[0]?.testCaseId).toBe("test-visible");
    });

    it("saves a FAILED attempt when a check fails", async () => {
        prismaMock.challenge.findFirst.mockResolvedValue(challenge);
        prismaMock.challengeTestCase.findMany.mockResolvedValue(testCases);

        evaluateHtmlMock.mockReturnValue({
            passed: false,
            totalTests: 2,
            passedTests: 1,
            failedTests: 1,
            checks: [
                {
                    testCaseId: "test-visible",
                    title: "Contains an HTML heading",
                    passed: false,
                    message: "Missing required element(s): h1.",
                },
                {
                    testCaseId: "test-hidden",
                    title: "Hidden heading check",
                    passed: true,
                    message: "All requirements satisfied.",
                },
            ],
        });

        prismaMock.challengeAttempt.create.mockResolvedValue({
            id: "attempt-456",
            status: "FAILED",
            executedAt: new Date("2026-10-15T10:05:00.000Z"),
        });

        const result = await submitHtmlChallenge(
            "user-123",
            "first-html-element",
            "<p>Hello</p>",
        );

        expect(result.success).toBe(true);

        if (!result.success) {
            throw new Error("Expected submission to succeed.");
        }

        expect(result.attempt.status).toBe("FAILED");

        expect(prismaMock.challengeAttempt.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    status: "FAILED",
                    errorMessage: "Missing required element(s): h1.",
                }),
            }),
        );
        expect(prismaMock.$transaction).not.toHaveBeenCalled();
        expect(txMock.userProgress.upsert).not.toHaveBeenCalled();
        expect(txMock.user.update).not.toHaveBeenCalled();
    });

    it("does not expose hidden test results", async () => {
        prismaMock.challenge.findFirst.mockResolvedValue(challenge);
        prismaMock.challengeTestCase.findMany.mockResolvedValue(testCases);

        evaluateHtmlMock.mockReturnValue({
            passed: false,
            totalTests: 2,
            passedTests: 1,
            failedTests: 1,
            checks: [
                {
                    testCaseId: "test-visible",
                    title: "Contains an HTML heading",
                    passed: true,
                    message: "All requirements satisfied.",
                },
                {
                    testCaseId: "test-hidden",
                    title: "Hidden heading check",
                    passed: false,
                    message: "Missing required element(s): h2.",
                },
            ],
        });

        prismaMock.challengeAttempt.create.mockResolvedValue({
            id: "attempt-789",
            status: "FAILED",
            executedAt: new Date("2026-10-15T10:10:00.000Z"),
        });

        const result = await submitHtmlChallenge(
            "user-123",
            "first-html-element",
            "<h1>Hello</h1>",
        );

        expect(result.success).toBe(true);

        if (!result.success) {
            throw new Error("Expected submission to succeed.");
        }

        expect(result.evaluation.checks).toHaveLength(1);
        expect(
            result.evaluation.checks.some(
                (check) => check.testCaseId === "test-hidden",
            ),
        ).toBe(false);
    });

    it("does not award XP again for an already completed challenge", async () => {
        prismaMock.challenge.findFirst.mockResolvedValue(challenge);
        prismaMock.challengeTestCase.findMany.mockResolvedValue(testCases);

        txMock.userProgress.findUnique.mockResolvedValue({
            isCompleted: true,
        });

        txMock.challengeAttempt.create.mockResolvedValue({
            id: "attempt-duplicate",
            status: "PASSED",
            executedAt: new Date("2026-10-15T10:15:00.000Z"),
        });

        evaluateHtmlMock.mockReturnValue({
            passed: true,
            totalTests: 2,
            passedTests: 2,
            failedTests: 0,
            checks: [
                {
                    testCaseId: "test-visible",
                    title: "Contains an HTML heading",
                    passed: true,
                    message: "All requirements satisfied.",
                },
                {
                    testCaseId: "test-hidden",
                    title: "Hidden heading check",
                    passed: true,
                    message: "All requirements satisfied.",
                },
            ],
        });

        const result = await submitHtmlChallenge(
            "user-123",
            "first-html-element",
            "<h1>Hello World</h1>",
        );

        expect(result.success).toBe(true);

        if (!result.success) {
            throw new Error("Expected submission to succeed.");
        }

        expect(result.progress).toEqual({
            isCompleted: true,
            xpAwarded: 0,
        });

        expect(txMock.userProgress.upsert).not.toHaveBeenCalled();
        expect(txMock.user.update).not.toHaveBeenCalled();

        expect(txMock.challengeAttempt.create).toHaveBeenCalledTimes(1);
    });

    it("retries the transaction when a serialization conflict occurs", async () => {
        prismaMock.challenge.findFirst.mockResolvedValue(challenge);
        prismaMock.challengeTestCase.findMany.mockResolvedValue(testCases);

        evaluateHtmlMock.mockReturnValue({
            passed: true,
            totalTests: 2,
            passedTests: 2,
            failedTests: 0,
            checks: [
                {
                    testCaseId: "test-visible",
                    title: "Contains an HTML heading",
                    passed: true,
                    message: "All requirements satisfied.",
                },
                {
                    testCaseId: "test-hidden",
                    title: "Hidden heading check",
                    passed: true,
                    message: "All requirements satisfied.",
                },
            ],
        });

        prismaMock.$transaction.mockImplementationOnce(async () => {
            throw { code: "P2034" };
        });

        const result = await submitHtmlChallenge(
            "user-123",
            "first-html-element",
            "<h1>Hello World</h1>",
        );

        expect(result.success).toBe(true);
        expect(prismaMock.$transaction).toHaveBeenCalledTimes(2);

        expect(prismaMock.$transaction).toHaveBeenLastCalledWith(
            expect.any(Function),
            {
                isolationLevel: "Serializable",
            },
        );
    });

    it("does not award XP when a retry finds the challenge already completed", async () => {
        prismaMock.challenge.findFirst.mockResolvedValue(challenge);
        prismaMock.challengeTestCase.findMany.mockResolvedValue(testCases);

        evaluateHtmlMock.mockReturnValue({
            passed: true,
            totalTests: 2,
            passedTests: 2,
            failedTests: 0,
            checks: [
                {
                    testCaseId: "test-visible",
                    title: "Contains an HTML heading",
                    passed: true,
                    message: "All requirements satisfied.",
                },
                {
                    testCaseId: "test-hidden",
                    title: "Hidden heading check",
                    passed: true,
                    message: "All requirements satisfied.",
                },
            ],
        });

        // Simulate a serialization conflict in the first transaction.
        prismaMock.$transaction.mockImplementationOnce(async () => {
            throw { code: "P2034" };
        });

        // On retry, the challenge is already completed.
        txMock.userProgress.findUnique.mockResolvedValueOnce({
            isCompleted: true,
        });

        const result = await submitHtmlChallenge(
            "user-123",
            "first-html-element",
            "<h1>Hello World</h1>",
        );

        expect(result.success).toBe(true);

        if (!result.success) {
            throw new Error("Expected submission to succeed.");
        }

        // The transaction should retry.
        expect(prismaMock.$transaction).toHaveBeenCalledTimes(2);

        // The completed challenge must not award XP again.
        expect(result.progress).toEqual({
            isCompleted: true,
            xpAwarded: 0,
        });

        expect(txMock.userProgress.upsert).not.toHaveBeenCalled();
        expect(txMock.user.update).not.toHaveBeenCalled();

        // The successful retry should still save the submission attempt.
        expect(txMock.challengeAttempt.create).toHaveBeenCalledTimes(1);
    });
});