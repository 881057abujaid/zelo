import { prisma } from "@/config/prisma.js";
import { evaluateHtml } from "./html-evaluator.service.js";

const MAX_TRANSACTION_RETRIES = 3;

export async function submitHtmlChallenge(
    userId: string,
    challengeSlug: string,
    submission: string,
) {
    let unlockedAchievements: {
        slug: string;
        title: string;
    }[] = [];

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
                            unlockedAchievements: [],
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

                    const completedCount = await tx.userProgress.count({
                        where: {
                            userId,
                            isCompleted: true,
                        },
                    });

                    const eligibleSlugs: string[] = [];

                    if (completedCount >= 1) {
                        eligibleSlugs.push("first-code");
                    }

                    if (completedCount >= 5) {
                        eligibleSlugs.push("bug-hunter");
                    }

                    const achievements = await tx.achievement.findMany({
                        where: {
                            slug: {
                                in: eligibleSlugs,
                            },
                            isPublished: true,
                        },
                        select: {
                            id: true,
                            slug: true,
                            title: true,
                        },
                    });

                    const existingAchievements = await tx.userAchievement.findMany({
                        where: {
                            userId,
                            achievementId: {
                                in: achievements.map((achievement) => achievement.id),
                            },
                        },
                        select: {
                            achievementId: true,
                        },
                    });

                    const existingAchievementIds = new Set(
                        existingAchievements.map((achievement) => achievement.achievementId),
                    );

                    const newAchievements = achievements.filter(
                        (achievement) => !existingAchievementIds.has(achievement.id),
                    );

                    if (newAchievements.length > 0) {
                        await tx.userAchievement.createMany({
                            data: newAchievements.map((achievement) => ({
                                userId,
                                achievementId: achievement.id,
                            })),
                            skipDuplicates: true,
                        });
                    }

                    return {
                        attempt: savedAttempt,
                        xpAwarded: challenge.xpReward,
                        isCompleted: true,
                        unlockedAchievements: newAchievements.map((achievement) => ({
                            slug: achievement.slug,
                            title: achievement.title,
                        })),
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
        unlockedAchievements = result.unlockedAchievements;
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
        unlockedAchievements,
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