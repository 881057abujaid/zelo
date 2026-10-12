import { describe, it, expect } from "vitest";

import { applyChallengeResult, updateMissionCompletion } from "./progressManager";

import type { PlayerProgress } from "./types";
import type { ChallengeResult } from "../onboarding/Challenge/engine/types";

const initialProgress: PlayerProgress = {
    xp: 0,
    lives: 3,
    currentChallengeId: "js-variables-01",
    completedChallenges: [],
    completedMissionIds: [],
    currentStreak: 0,
};

const createResult = (
    overrides: Partial<ChallengeResult> = {}
): ChallengeResult => ({
    challengeId: "js-variables-01",
    executed: true,
    isCorrect: true,
    output: "Execution successful",
    xpEarned: 50,
    livesRemaining: 3,
    ...overrides,
});

describe("applyChallengeResult", () => {
    it("should award XP for a correct answer", () => {
        const result = applyChallengeResult(
            initialProgress,
            createResult()
        );

        expect(result.xp).toBe(50);
        expect(result.completedChallenges).toEqual([
            "js-variables-01",
        ]);
        expect(result.lives).toBe(3);
    });

    it("should not award duplicate XP", () => {
        const progress: PlayerProgress = {
            ...initialProgress,
            xp: 50,
            completedChallenges: ["js-variables-01"],
        };

        const result = applyChallengeResult(
            progress,
            createResult()
        );

        expect(result.xp).toBe(50);
        expect(result.completedChallenges).toEqual([
            "js-variables-01",
        ]);
    });

    it("should decrease lives for an incorrect answer", () => {
        const result = applyChallengeResult(
            initialProgress,
            createResult({
                isCorrect: false,
                xpEarned: 0,
            })
        );

        expect(result.xp).toBe(0);
        expect(result.lives).toBe(2);
        expect(result.completedChallenges).toEqual([]);
    });

    it("should not change progress when execution fails", () => {
        const result = applyChallengeResult(
            initialProgress,
            createResult({
                executed: false,
                isCorrect: false,
                xpEarned: 0,
            })
        );

        expect(result).toBe(initialProgress);
    });

    it("should never reduce lives below zero", () => {
        const progress: PlayerProgress = {
            ...initialProgress,
            lives: 0,
        };

        const result = applyChallengeResult(
            progress,
            createResult({
                isCorrect: false,
                xpEarned: 0,
            })
        );

        expect(result.lives).toBe(0);
    });

    it("should preserve completed missions", () => {
        const progress: PlayerProgress = {
            ...initialProgress,
            completedMissionIds: ["programming-variables"],
        };

        const result = applyChallengeResult(
            progress,
            createResult()
        );

        expect(result.completedMissionIds).toEqual([
            "programming-variables",
        ]);
    });

    describe("updateMissionCompletion", () => {
        const requiredChallenges = [
            "js-variables-01",
            "js-variables-02",
            "js-variables-03",
            "js-variables-04",
            "js-variables-05",
        ];

        it("should complete the mission when all required challenges are completed", () => {
            const progress: PlayerProgress = {
                ...initialProgress,
                completedChallenges: [...requiredChallenges],
            };

            const updatedProgress = updateMissionCompletion(
                progress,
                "programming-variables"
            );

            expect(updatedProgress.completedMissionIds).toContain(
                "programming-variables"
            );
        });

        it("should not complete the mission when some challenges are incomplete", () => {
            const progress: PlayerProgress = {
                ...initialProgress,
                completedChallenges: requiredChallenges.slice(0, 4),
            };

            const updatedProgress = updateMissionCompletion(
                progress,
                "programming-variables"
            );

            expect(updatedProgress.completedMissionIds).not.toContain(
                "programming-variables"
            );
        });

        it("should not add the same mission twice", () => {
            const progress: PlayerProgress = {
                ...initialProgress,
                completedChallenges: [...requiredChallenges],
                completedMissionIds: ["programming-variables"],
            };

            const updatedProgress = updateMissionCompletion(
                progress,
                "programming-variables"
            );

            expect(
                updatedProgress.completedMissionIds.filter(
                    (id) => id === "programming-variables"
                )
            ).toHaveLength(1);
        });

        it("should preserve progress when the mission has no requirements mapping", () => {
            const updatedProgress = updateMissionCompletion(
                initialProgress,
                "unknown-mission"
            );

            expect(updatedProgress).toBe(initialProgress);
        });
    });
});