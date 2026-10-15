import { prisma } from "@/config/prisma.js";
import { evaluateHtml } from "./html-evaluator.service.js";

export async function submitHtmlChallenge(
    userId: string,
    challengeSlug: string,
    submission: string,
) {
    const challenge = await prisma.challenge.findFirst({
        where: {
            slug: challengeSlug,
            isPublished: true,
            world: {
                isPublished: true,
            },
        },
        select: {
            id: true,
            slug: true,
            title: true,
            difficulty: true,
            xpReward: true,
            world: {
                select: {
                    slug: true,
                    title: true,
                },
            },
        },
    });

    if (!challenge) {
        return {
            success: false as const,
            reason: "CHALLENGE_NOT_FOUND" as const,
        };
    }

    const testCases = await prisma.challengeTestCase.findMany({
        where: {
            challengeId: challenge.id,
        },
        select: {
            id: true,
            title: true,
            input: true,
            expected: true,
            isHidden: true,
            orderIndex: true,
        },
        orderBy: {
            orderIndex: "asc",
        },
    });

    const evaluation = evaluateHtml(submission, testCases);

    const attempt = await prisma.challengeAttempt.create({
        data: {
            userId,
            challengeId: challenge.id,
            status: evaluation.passed ? "PASSED" : "FAILED",
            submission,
            errorMessage: evaluation.passed
                ? null
                : evaluation.checks
                    .filter((check) => !check.passed)
                    .map((check) => check.message)
                    .join("\n"),
        },
        select: {
            id: true,
            status: true,
            executedAt: true,
        },
    });

    return {
        success: true as const,
        challenge: {
            slug: challenge.slug,
            title: challenge.title,
            difficulty: challenge.difficulty,
            xpReward: challenge.xpReward,
            world: challenge.world,
        },
        attempt,
        evaluation: {
            passed: evaluation.passed,
            checks: evaluation.checks.filter((check) => {
                const testCase = testCases.find(
                    (item) => item.id === check.testCaseId,
                );

                return testCase && !testCase.isHidden;
            }),
        },
    };
}