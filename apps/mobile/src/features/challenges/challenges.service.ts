import { api } from "@/lib/api";

export interface ChallengeCheck {
    testCaseId: string;
    title: string;
    passed: boolean;
    message: string;
}

export interface ChallengeSubmissionResult {
    success: boolean;

    challenge: {
        slug: string;
        title: string;
        difficulty: string;
        xpReward: number;

        world: {
            slug: string;
            title: string;
        };
    };

    attempt: {
        id: string;
        status: "PENDING" | "PASSED" | "FAILED";
        executedAt: string;
    };

    evaluation: {
        passed: boolean;
        checks: ChallengeCheck[];
    };

    progress: {
        isCompleted: boolean;
        xpAwarded: number;
    };

    unlockedAchievements: {
        slug: string;
        title: string;
    }[];
}

interface ChallengeSubmissionResponse {
    success: boolean;
    message: string;
    data: ChallengeSubmissionResult;
}

export async function submitChallenge(
    slug: string,
    submission: string,
): Promise<ChallengeSubmissionResponse> {
    const response = await api.post<ChallengeSubmissionResponse>(
        `/challenges/${encodeURIComponent(slug)}/submit`,
        { submission },
    );

    return response.data;
}