import type { ExpectedValueValidation } from "../types";

export type ExpectedValueValidationResult = {
    isCorrect: boolean;
    message: string;
};

export function validateExpectedValue(
    code: string,
    config: ExpectedValueValidation
): ExpectedValueValidationResult {
    const normalizedCode = code
        .replace(/\s+/g, " ")
        .trim();

    const variableRegex = new RegExp(
        `\\b(const|let|var)\\s+${config.variableName}\\s*=\\s*(.+?)(?:;|$)`
    );

    const match = normalizedCode.match(variableRegex);

    if (!match) {
        return {
            isCorrect: false,
            message: `Create a variable called "${config.variableName}".`,
        };
    }

    const actualValue = match[2].trim();

    let expectedCode: string;

    if (typeof config.expectedValue === "string") {
        expectedCode = JSON.stringify(config.expectedValue);
    } else {
        expectedCode = String(config.expectedValue);
    }

    if (actualValue !== expectedCode) {
        return {
            isCorrect: false,
            message: `The "${config.variableName}" variable should contain the expected value.`,
        };
    }

    return {
        isCorrect: true,
        message: `Correct! The "${config.variableName}" variable has the expected value.`,
    };
}