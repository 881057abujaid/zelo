import { describe, it, expect, vi } from "vitest";

import { submitChallenge } from "./challengeRunner";

import type { Challenge } from "./types";
import type { CodeExecutor } from "./executor/executor";
import type { ExecutionResult } from "./executor/types";

const createExecutor = (
    result: ExecutionResult
): CodeExecutor => ({
    execute: vi.fn().mockResolvedValue(result),
});

const variableChallenge: Challenge = {
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
};

describe("submitChallenge", () => {
    it("should pass when the submitted variable is correct", async () => {
        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
            executionTime: 10,
        });

        const result = await submitChallenge(
            variableChallenge,
            'const name = "Nova";',
            executor
        );

        expect(result).toMatchObject({
            challengeId: "test-variable",
            executed: true,
            isCorrect: true,
            output: "Execution successful",
            xpEarned: 50,
            livesRemaining: 3,
        });

        expect(result.error).toBeUndefined();
        expect(executor.execute).toHaveBeenCalledTimes(1);
    });

    it("should fail when the required variable is missing", async () => {
        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const result = await submitChallenge(
            variableChallenge,
            'const age = 21;',
            executor
        );

        expect(result).toMatchObject({
            executed: true,
            isCorrect: false,
            xpEarned: 0,
            livesRemaining: 2,
        });

        expect(result.error).toBeDefined();
    });

    it("should reject invalid syntax before calling the executor", async () => {
        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const result = await submitChallenge(
            variableChallenge,
            "const name = ;",
            executor
        );

        expect(result).toMatchObject({
            executed: false,
            isCorrect: false,
            output: "",
            xpEarned: 0,
            livesRemaining: 3,
        });

        expect(result.error).toBeDefined();
        expect(executor.execute).not.toHaveBeenCalled();
    });

    it("should return an error when the executor fails", async () => {
        const executor = createExecutor({
            status: "error",
            output: "",
            error: "Execution failed",
        });

        const result = await submitChallenge(
            variableChallenge,
            'const name = "Nova";',
            executor
        );

        expect(result).toMatchObject({
            executed: false,
            isCorrect: false,
            output: "",
            error: "Execution failed",
            xpEarned: 0,
            livesRemaining: 3,
        });

        expect(executor.execute).toHaveBeenCalledTimes(1);
    });

    it("should handle executor timeouts without awarding XP", async () => {
        const executor = createExecutor({
            status: "timeout",
            output: "",
            error: "Execution timed out",
        });

        const result = await submitChallenge(
            variableChallenge,
            'const name = "Nova";',
            executor
        );

        expect(result).toMatchObject({
            executed: false,
            isCorrect: false,
            xpEarned: 0,
            livesRemaining: 3,
        });

        expect(result.error).toBe("Execution timed out");
    });

    it("should return zero XP for an incorrect expected value", async () => {
        const challenge: Challenge = {
            ...variableChallenge,
            id: "test-age",
            validation: {
                type: "expectedValue",
                variableName: "age",
                expectedValue: 21,
            },
        };

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const result = await submitChallenge(
            challenge,
            "const age = 18;",
            executor
        );

        expect(result).toMatchObject({
            executed: true,
            isCorrect: false,
            xpEarned: 0,
            livesRemaining: 2,
        });

        expect(result.error).toBeDefined();
    });

    it("should pass when the expected value matches", async () => {
        const challenge: Challenge = {
            ...variableChallenge,
            id: "test-age-correct",
            validation: {
                type: "expectedValue",
                variableName: "age",
                expectedValue: 21,
            },
        };

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const result = await submitChallenge(
            challenge,
            "const age = 21;",
            executor
        );

        expect(result).toMatchObject({
            executed: true,
            isCorrect: true,
            xpEarned: 50,
            livesRemaining: 3,
        });

        expect(result.error).toBeUndefined();
    });

    it("should pass when the expected expression matches", async () => {
        const challenge: Challenge = {
            ...variableChallenge,
            id: "test-expression",
            validation: {
                type: "expression",
                variableName: "total",
                expectedExpression: "10 + 5",
            },
        };

        const executor = createExecutor({
            status: "success",
            output: "Execution successful",
        });

        const result = await submitChallenge(
            challenge,
            "const total = 10 + 5;",
            executor
        );

        expect(result).toMatchObject({
            executed: true,
            isCorrect: true,
            xpEarned: 50,
            livesRemaining: 3,
        });
    });

    it("should reject unsupported validation without executing code", async () => {
        const challenge: Challenge = {
            ...variableChallenge,
            validation: {
                type: "output",
                expectedOutput: "Hello, Nova!",
            },
        };

        const executor = createExecutor({
            status: "success",
            output: "Hello, Nova!",
        });

        const result = await submitChallenge(
            challenge,
            'console.log("Hello, Nova!");',
            executor
        );

        expect(result.executed).toBe(false);
        expect(result.isCorrect).toBe(false);
        expect(result.xpEarned).toBe(0);

        expect(result.error).toBeDefined();
        expect(executor.execute).not.toHaveBeenCalled();
    });
});