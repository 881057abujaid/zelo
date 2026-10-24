import type { PlayerProgress } from "./types";

export const MAX_LIVES = 3;

export function getLocalDateKey(date = new Date()): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export const initialProgress: PlayerProgress = {
    xp: 0,
    lives: MAX_LIVES,
    currentChallengeId: "js-variables-01",
    completedChallenges: [],
    completedMissionIds: [],
    currentStreak: 0,

    // Daily Mission
    dailyCompletedChallengeIds: [],
    dailyProgressDate: getLocalDateKey(),
};