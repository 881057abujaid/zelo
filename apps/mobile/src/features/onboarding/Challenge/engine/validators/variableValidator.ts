import type { VariableValidation } from "../types";

export type ValidationResult = {
    isCorrect: boolean;
    message: string;
};

export function validateVariable(
    code: string,
    config: VariableValidation
): ValidationResult {
    const normalizedCode = code.replace(/\s+/g, " ").trim();

    const variableRegex = new RegExp(
        `\\b(const|let|var)\\s+${config.variableName}\\s*=`
    );

    const hasVariable = variableRegex.test(normalizedCode);

    if (!hasVariable) {
        return {
            isCorrect: false,
            message: `Create a variable called "${config.variableName}".`,
        };
    }

    const valueRegex = new RegExp(
        `\\b(?:const|let|var)\\s+${config.variableName}\\s*=\\s*["']([^"']*)["']`
    );

    const match = normalizedCode.match(valueRegex);

    if (!match) {
        return {
            isCorrect: false,
            message: `Store a value inside the "${config.variableName}" variable.`,
        };
    }

    const value = match[1].trim();

    if (!config.allowEmpty && !value) {
        return {
            isCorrect: false,
            message: `Your "${config.variableName}" variable cannot be empty.`,
        };
    }

    return {
        isCorrect: true,
        message: `Great job! You created the ${config.variableName} variable correctly.`,
    };
}