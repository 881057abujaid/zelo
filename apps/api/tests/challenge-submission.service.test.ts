import { beforeEach, describe, expect, it, vi } from "vitest";

const { prismaMock, evaluateHtmlMock } = vi.hoisted(() => ({
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
    },
    evaluateHtmlMock: vi.fn(),
}));

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

        prismaMock.challengeAttempt.create.mockResolvedValue({
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

        expect(prismaMock.challengeAttempt.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    userId: "user-123",
                    challengeId: "challenge-123",
                    status: "PASSED",
                    submission,
                    errorMessage: null,
                }),
            }),
        );

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
});