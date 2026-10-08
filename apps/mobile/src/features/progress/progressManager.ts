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