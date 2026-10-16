import { prisma } from "@/config/prisma.js";
import { evaluateHtml } from "./html-evaluator.service.js";

const MAX_TRANSACTION_RETRIES = 3;

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

    const attemptData = {
        userId,
        challengeId: challenge.id,
        status: evaluation.passed ? "PASSED" as const : "FAILED" as const,
        submission,
        errorMessage: evaluation.passed
            ? null
            : evaluation.checks
                .filter((check) => !check.passed)
                .map((check) => check.message)
                .join("\n"),
    };

    let attempt: {
        id: string;
        status: "PENDING" | "PASSED" | "FAILED";
        executedAt: Date;
    };

    let xpAwarded = 0;
    let isCompleted = false;

    if (evaluation.passed) {
        const result = await withTransactionRetry(() =>
            prisma.$transaction(
                async (tx) => {
                    const existingProgress = await tx.userProgress.findUnique({
                        where: {
                            userId_challengeId: {
                                userId,
                                challengeId: challenge.id,
                            },
                        },
                        select: {
                            isCompleted: true,
                        },
                    });

                    const alreadyCompleted =
                        existingProgress?.isCompleted === true;

                    const savedAttempt = await tx.challengeAttempt.create({
                        data: attemptData,
                        select: {
                            id: true,
                            status: true,
                            executedAt: true,
                        },
                    });

                    if (alreadyCompleted) {
                        return {
                            attempt: savedAttempt,
                            xpAwarded: 0,
                            isCompleted: true,
                        };
                    }

                    await tx.userProgress.upsert({
                        where: {
                            userId_challengeId: {
                                userId,
                                challengeId: challenge.id,
                            },
                        },
                        create: {
                            userId,
                            challengeId: challenge.id,
                            isCompleted: true,
                            xpEarned: challenge.xpReward,
                            completedAt: new Date(),
                        },
                        update: {
                            isCompleted: true,
                            xpEarned: challenge.xpReward,
                            completedAt: new Date(),
                        },
                    });

                    await tx.user.update({
                        where: {
                            id: userId,
                        },
                        data: {
                            totalXp: {
                                increment: challenge.xpReward,
                            },
                        },
                    });

                    return {
                        attempt: savedAttempt,
                        xpAwarded: challenge.xpReward,
                        isCompleted: true,
                    };
                },
                {
                    isolationLevel: "Serializable",
                },
            ),
        );

        attempt = result.attempt;
        xpAwarded = result.xpAwarded;
        isCompleted = result.isCompleted;
    } else {
        attempt = await prisma.challengeAttempt.create({
            data: attemptData,
            select: {
                id: true,
                status: true,
                executedAt: true,
            },
        });
    }

    const visibleChecks = evaluation.checks.filter((check) => {
        const testCase = testCases.find(
            (item) => item.id === check.testCaseId,
        );

        return testCase && !testCase.isHidden;
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
            checks: visibleChecks,
        },
        progress: {
            isCompleted,
            xpAwarded,
        },
    };
}

async function withTransactionRetry<T>(
    operation: () => Promise<T>,
): Promise<T> {
    for (let attempt = 1; ; attempt++) {
        try {
            return await operation();
        } catch (error) {
            const isSerializationConflict =
                typeof error === "object" &&
                error !== null &&
                "code" in error &&
                error.code === "P2034";

            if (
                !isSerializationConflict ||
                attempt >= MAX_TRANSACTION_RETRIES
            ) {
                throw error;
            }
        }
    }
}