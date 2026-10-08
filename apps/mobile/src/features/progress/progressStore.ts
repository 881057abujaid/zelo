import { create } from "zustand";

import type { PlayerProgress } from "./types";
import { initialProgress } from "./progressState";

type ProgressStore = PlayerProgress & {
    applyProgress: (updatedProgress: PlayerProgress) => void;
    resetProgress: () => void;
    setCurrentChallenge: (challengeId: string) => void;
};

export const useProgressStore = create<ProgressStore>((set) => ({
    ...initialProgress,

    applyProgress: (updatedProgress) => {
        set(updatedProgress);
    },

    setCurrentChallenge: (challengeId) => {
        set({
            currentChallengeId: challengeId,
        });
    },

    resetProgress: () => {
        set(initialProgress);
    },
}));