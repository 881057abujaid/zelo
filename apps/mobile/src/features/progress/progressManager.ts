import type { PlayerProgress } from "./types";
import type { ChallengeResult } from "../onboarding/Challenge/engine/types";

export function applyChallengeResult(
    progress: PlayerProgress,
    result: ChallengeResult,
): PlayerProgress {
    if (!result.executed) {
        return progress;
    }

    if (result.isCorrect) {
        const alreadyCompleted = progress.completedChallenges.includes(result.challengeId);
        if (alreadyCompleted) {
            return progress;
        }

        return {
            ...progress,

            xp: progress.xp + result.xpEarned,

            completedChallenges: [
                ...progress.completedChallenges,
                result.challengeId
            ],
        };
    }

    return {
        ...progress,

        lives: Math.max(progress.lives - 1, 0),
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