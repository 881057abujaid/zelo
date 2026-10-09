import { describe, it, expect, vi } from "vitest";

import { submitChallengeAndUpdateProgress } from "./challengeService";

import type { Challenge } from "./types";
import type { CodeExecutor } from "./executor/executor";
import type { ExecutionResult } from "./executor/types";
import type { PlayerProgress } from "@/features/progress/types";

const initialProgress: PlayerProgress = {
    xp: 0,
    lives: 3,
    currentChallengeId: "js-variables-01",
    completedChallenges: [],
    currentStreak: 0,
};

const createChallenge = (): Challenge => ({
    id: "test-variable",
    number: 1,
    total: 5,
    title: "Create a variable",
    category: "JavaScript Foundations",
    difficulty: "Beginner",
    type: "code",
    description: "Create a variable named name.",
    starterCode: 'const name = "";',
    language: "javascript",
    xp: 50,
    lives: 3,
    validation: {
        type: "variable",
        variableName: "name",
        required: true,
        allowEmpty: false,
    },
});

const createExecutor = (
    result: ExecutionResult
): CodeExecutor => ({
    execute: vi.fn().mockResolvedValue(result),
});

describe("submitChallengeAndUpdateProgress", () => {
    it("should award XP and mark the challenge completed", async () => {
        const challenge = createChallenge();

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
            executionTime: 10,
        });

        const { result, progress } =
            await submitChallengeAndUpdateProgress(
                challenge,
                'const name = "Nova";',
                initialProgress,
                executor
            );

        expect(result.isCorrect).toBe(true);
        expect(result.xpEarned).toBe(50);

        expect(progress).toMatchObject({
            xp: 50,
            lives: 3,
            completedChallenges: ["test-variable"],
        });
    });

    it("should not award duplicate XP for an already completed challenge", async () => {
        const challenge = createChallenge();

        const progressWithCompletedChallenge: PlayerProgress = {
            ...initialProgress,
            xp: 50,
            completedChallenges: ["test-variable"],
        };

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const { progress } =
            await submitChallengeAndUpdateProgress(
                challenge,
                'const name = "Nova";',
                progressWithCompletedChallenge,
                executor
            );

        expect(progress.xp).toBe(50);

        expect(progress.completedChallenges).toEqual([
            "test-variable",
        ]);

        expect(progress.lives).toBe(3);
    });

    it("should decrease one life for an incorrect answer", async () => {
        const challenge = createChallenge();

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const { result, progress } =
            await submitChallengeAndUpdateProgress(
                challenge,
                "const age = 21;",
                initialProgress,
                executor
            );

        expect(result.executed).toBe(true);
        expect(result.isCorrect).toBe(false);

        expect(progress).toMatchObject({
            xp: 0,
            lives: 2,
            completedChallenges: [],
        });
    });

    it("should not decrease lives for invalid syntax", async () => {
        const challenge = createChallenge();

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const { result, progress } =
            await submitChallengeAndUpdateProgress(
                challenge,
                "const name = ;",
                initialProgress,
                executor
            );

        expect(result.executed).toBe(false);
        expect(result.isCorrect).toBe(false);

        expect(progress).toEqual(initialProgress);

        expect(executor.execute).not.toHaveBeenCalled();
    });

    it("should not change progress when the executor fails", async () => {
        const challenge = createChallenge();

        const executor = createExecutor({
            status: "error",
            output: "",
            error: "Execution failed",
        });

        const { result, progress } =
            await submitChallengeAndUpdateProgress(
                challenge,
                'const name = "Nova";',
                initialProgress,
                executor
            );

        expect(result.executed).toBe(false);
        expect(result.xpEarned).toBe(0);

        expect(progress).toEqual(initialProgress);
    });

    it("should not decrease lives below zero", async () => {
        const challenge = createChallenge();

        const progressWithoutLives: PlayerProgress = {
            ...initialProgress,
            lives: 0,
        };

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const { progress } =
            await submitChallengeAndUpdateProgress(
                challenge,
                "const age = 21;",
                progressWithoutLives,
                executor
            );

        expect(progress.lives).toBe(0);
        expect(progress.xp).toBe(0);
    });

    it("should preserve the original progress object", async () => {
        const challenge = createChallenge();

        const originalProgress: PlayerProgress = {
            ...initialProgress,
            completedChallenges: [],
        };

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        await submitChallengeAndUpdateProgress(
            challenge,
            'const name = "Nova";',
            originalProgress,
            executor
        );

        expect(originalProgress).toEqual(initialProgress);
    });

    it("should reject submissions when the player has no lives", async () => {
        const challenge = createChallenge();

        const progressWithoutLives: PlayerProgress = {
            ...initialProgress,
            lives: 0,
        };

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const { result, progress } =
            await submitChallengeAndUpdateProgress(
                challenge,
                'const name = "Nova";',
                progressWithoutLives,
                executor
            );

        expect(result.executed).toBe(false);
        expect(result.isCorrect).toBe(false);
        expect(result.xpEarned).toBe(0);

        expect(progress).toEqual(progressWithoutLives);
        expect(executor.execute).not.toHaveBeenCalled();
    });
});