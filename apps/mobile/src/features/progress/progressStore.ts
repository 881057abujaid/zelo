import { create } from "zustand";

import type { PlayerProgress } from "./types";
import { initialProgress, MAX_LIVES } from "./progressState";

type ProgressStore = PlayerProgress & {
    applyProgress: (updatedProgress: PlayerProgress) => void;
    setCurrentChallenge: (challengeId: string) => void;
    completeMission: (missionId: string) => void;
    restoreLives: () => void;
    resetProgress: () => void;
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

    completeMission: (missionId) => {
        set((state) => {
            if (state.completedMissionIds.includes(missionId)) {
                return state;
            }

            return {
                completedMissionIds: [
                    ...state.completedMissionIds,
                    missionId,
                ],
            };
        });
    },

    restoreLives: () => {
        set({
            lives: MAX_LIVES,
        });
    },

    resetProgress: () => {
        set(initialProgress);
    },
}));