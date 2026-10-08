import type { VariableValidation } from "../types";

export type ValidationResult = {
    isCorrect: boolean;
    message: string;
};

export function validateVariable(
    code: string,
    config: VariableValidation
): ValidationResult {
    const normalizedCode = code
        .replace(/\s+/g, " ")
        .trim();

    const variableRegex = new RegExp(
        `\\b(const|let|var)\\s+${config.variableName}\\s*=\\s*(.+)`
    );

    const match = normalizedCode.match(variableRegex);

    if (!match) {
        return {
            isCorrect: false,
            message: `Create a variable called "${config.variableName}".`,
        };
    }

    const value = match[2]
        .trim()
        .replace(/;$/, "")
        .trim();

    if (!value) {
        return {
            isCorrect: false,
            message: `Store a value inside the "${config.variableName}" variable.`,
        };
    }

    if (!config.allowEmpty) {
        const isEmptyString =
            /^["']\s*["']$/.test(value);

        if (isEmptyString) {
            return {
                isCorrect: false,
                message: `Your "${config.variableName}" variable cannot be empty.`,
            };
        }
    }

    return {
        isCorrect: true,
        message: `Great job! You created the ${config.variableName} variable correctly.`,
    };
}