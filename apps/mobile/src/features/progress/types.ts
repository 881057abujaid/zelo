export type PlayerProgress = {
    xp: number;

    lives: number;

    currentChallengeId: string | null;

    completedChallenges: string[];

    completedMissionIds: string[];

    currentStreak: number;
};