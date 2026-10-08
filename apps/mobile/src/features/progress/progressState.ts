import type { PlayerProgress } from "./types";

export const initialProgress: PlayerProgress = {
    xp: 0,

    lives: 3,

    currentChallengeId: null,

    completedChallenges: [],

    currentStreak: 0,
};