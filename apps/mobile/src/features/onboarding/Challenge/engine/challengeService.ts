import type { Challenge, ChallengeResult } from "./types";
import { submitChallenge } from "./challengeRunner";

import type { PlayerProgress } from "@/features/progress/types";
import { applyChallengeResult } from "@/features/progress/progressManager";

type Executor = {
    execute: (code: string) => Promise<{
        status: "success" | "error" | "timeout";
        output: string;
        error?: string;
        executionTime?: number;
    }>;
};

export async function submitChallengeAndUpdateProgress(
    challenge: Challenge,
    code: string,
    progress: PlayerProgress,
    executor: Executor
): Promise<{
    result: ChallengeResult;
    progress: PlayerProgress;
}> {
    const result = await submitChallenge(challenge, code, executor);
    const updateProgress = applyChallengeResult(progress, result);

    return {
        result,
        progress: updateProgress,
    };
}