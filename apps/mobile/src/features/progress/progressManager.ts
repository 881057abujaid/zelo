import type { PlayerProgress } from "./types";
import type { ChallengeResult } from "../onboarding/Challenge/engine/types";
import { getLocalDateKey } from "./progressState";

export function applyChallengeResult(
    progress: PlayerProgress,
    result: ChallengeResult,
): PlayerProgress {
    // Ignore results that have not been executed.
    if (!result.executed) {
        return progress;
    }

    // Reset daily progress if the local date has changed.
    const currentProgress = resetDailyProgressIfNeeded(progress);

    if (result.isCorrect) {
        const alreadyCompleted =
            currentProgress.completedChallenges.includes(
                result.challengeId,
            );

        // Record daily completion even if the challenge
        // was completed previously, but award XP only once.
        const updatedDailyProgress = recordDailyChallengeCompletion(
            currentProgress,
            result.challengeId,
        );

        if (alreadyCompleted) {
            return updatedDailyProgress;
        }

        return {
            ...updatedDailyProgress,
            xp: updatedDailyProgress.xp + result.xpEarned,
            completedChallenges: [
                ...updatedDailyProgress.completedChallenges,
                result.challengeId,
            ],
        };
    }

    // Incorrect answers reduce lives but do not count
    // toward daily challenge completion.
    return {
        ...currentProgress,
        lives: Math.max(currentProgress.lives - 1, 0),
    };
}

export function setCurrentChallenge(
    progress: PlayerProgress,
    challengeId: string,
): PlayerProgress {
    return {
        ...progress,
        currentChallengeId: challengeId,
    };
}

const MISSION_CHALLENGE_REQUIREMENTS: Record<string, string[]> = {
    "programming-variables": [
        "js-variables-01",
        "js-variables-02",
        "js-variables-03",
        "js-variables-04",
        "js-variables-05",
    ],
    "programming-conditions": [
        "js-conditions-01",
        "js-conditions-02",
        "js-conditions-03",
    ],
};

export function updateMissionCompletion(
    progress: PlayerProgress,
    missionId: string
): PlayerProgress {
    const requiredChallenges =
        MISSION_CHALLENGE_REQUIREMENTS[missionId];

    if (!requiredChallenges) {
        return progress;
    }

    const allChallengesCompleted = requiredChallenges.every(
        (challengeId) =>
            progress.completedChallenges.includes(challengeId)
    );

    if (
        !allChallengesCompleted ||
        progress.completedMissionIds.includes(missionId)
    ) {
        return progress;
    }

    return {
        ...progress,
        completedMissionIds: [
            ...progress.completedMissionIds,
            missionId,
        ],
    };
}

export function resetDailyProgressIfNeeded(
    progress: PlayerProgress,
    dateKey = getLocalDateKey(),
): PlayerProgress {
    if (progress.dailyProgressDate === dateKey) {
        return progress;
    }

    return {
        ...progress,
        dailyCompletedChallengeIds: [],
        dailyProgressDate: dateKey,
    };
}

export function recordDailyChallengeCompletion(
    progress: PlayerProgress,
    challengeId: string,
    dateKey = getLocalDateKey(),
): PlayerProgress {
    const currentProgress = resetDailyProgressIfNeeded(
        progress,
        dateKey,
    );

    if (
        currentProgress.dailyCompletedChallengeIds.includes(
            challengeId,
        )
    ) {
        return currentProgress;
    }

    return {
        ...currentProgress,
        dailyCompletedChallengeIds: [
            ...currentProgress.dailyCompletedChallengeIds,
            challengeId,
        ],
    };
}