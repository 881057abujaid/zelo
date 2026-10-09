import type { PlayerProgress } from "./types";

export const MAX_LIVES = 3;

export const initialProgress: PlayerProgress = {
    xp: 0,

    lives: MAX_LIVES,

    currentChallengeId: "js-variables-01",

    completedChallenges: [],

    currentStreak: 0,
};