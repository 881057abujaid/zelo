import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { PlayerProgress } from "./types";
import { initialProgress, MAX_LIVES, getLocalDateKey } from "./progressState";
import { recordDailyChallengeCompletion, resetDailyProgressIfNeeded } from "./progressManager";

type ProgressStore = PlayerProgress & {
    applyProgress: (updatedProgress: PlayerProgress) => void;
    setCurrentChallenge: (challengeId: string) => void;
    completeMission: (missionId: string) => void;
    restoreLives: () => void;
    resetProgress: () => void;
    recordDailyChallenge: (challengeId: string) => void;
    resetDailyProgressIfNeeded: () => void;
};

export const useProgressStore = create<ProgressStore>()(
    persist(
        (set) => ({
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

            resetDailyProgressIfNeeded: () => {
                set((state) =>
                    resetDailyProgressIfNeeded(
                        state,
                        getLocalDateKey(),
                    ),
                );
            },

            recordDailyChallenge: (challengeId) => {
                set((state) =>
                    recordDailyChallengeCompletion(
                        state,
                        challengeId,
                        getLocalDateKey(),
                    ),
                );
            },

            restoreLives: () => {
                set({
                    lives: MAX_LIVES,
                });
            },

            resetProgress: () => {
                set(initialProgress);
            },
        }),
        {
            name: "zelo-player-progress",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);