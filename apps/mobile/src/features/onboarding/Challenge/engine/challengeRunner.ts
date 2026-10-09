import type { Challenge, ChallengeResult } from "./types";
import type { ExecutionResult } from "./executor/types";
import { validateExpectedValue } from "./validators/expectedValueValidator";
import { validateVariable } from "./validators/variableValidator";
import { validateExpression } from "./validators/expressionValidator";
import { validateSyntax } from "./validators/syntaxValidator";

type Executor = {
    execute: (code: string) => Promise<ExecutionResult>;
};

/**
 * Executes learner code and returns the raw execution result.
 */
export async function executeCode(
    code: string,
    executor: Executor
): Promise<ExecutionResult> {
    return executor.execute(code);
}

/**
 * Executes and validates a challenge submission.
 */
export async function submitChallenge(
    challenge: Challenge,
    code: string,
    executor: Executor
): Promise<ChallengeResult> {
    const syntaxResult = validateSyntax(code);

    if (!syntaxResult.isValid) {
        return {
            challengeId: challenge.id,
            executed: false,
            isCorrect: false,
            output: "",
            error: syntaxResult.error,
            xpEarned: 0,
            livesRemaining: challenge.lives,
        };
    }

    const executionResult = await executeCode(code, executor);

    // Execution failed
    if (executionResult.status !== "success") {
        return {
            challengeId: challenge.id,

            executed: false,
            isCorrect: false,

            output: executionResult.output,

            error:
                executionResult.error ??
                "Code execution failed.",

            xpEarned: 0,
            livesRemaining: challenge.lives,

            executionTime: executionResult.executionTime,
        };
    }

    const validation = challenge.validation;

    let isCorrect = false;
    let validationMessage = "";

    switch (validation.type) {
        case "variable": {
            const result = validateVariable(code, validation);

            isCorrect = result.isCorrect;
            validationMessage = result.message;

            break;
        }

        case "expectedValue": {
            const result = validateExpectedValue(
                code,
                validation
            );

            isCorrect = result.isCorrect;
            validationMessage = result.message;
            break;
        }

        case "expression": {
            const result = validateExpression(code, validation);

            isCorrect = result.isCorrect;
            validationMessage = result.message;
            break;
        }

        default: {
            validationMessage =
                "This challenge type is not supported yet.";
        }
    }

    return {
        challengeId: challenge.id,

        executed: true,
        isCorrect,

        output: executionResult.output,

        ...(isCorrect
            ? {}
            : { error: validationMessage }),

        xpEarned: isCorrect ? challenge.xp : 0,

        livesRemaining: isCorrect
            ? challenge.lives
            : Math.max(challenge.lives - 1, 0),

        executionTime: executionResult.executionTime,
    };
}