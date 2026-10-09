import type { ExpressionValidation } from "../types";

export type ExpressionValidationResult = {
    isCorrect: boolean;
    message: string;
};

export function validateExpression(
    code: string,
    config: ExpressionValidation
): ExpressionValidationResult {
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

    const actualExpression = match[2]
        .trim()
        .replace(/;$/, "")
        .trim();

    const normalizeExpression = (expression: string) =>
        expression.replace(/\s+/g, "");

    const isCorrect =
        normalizeExpression(actualExpression) ===
        normalizeExpression(config.expectedExpression);

    return {
        isCorrect,
        message: isCorrect
            ? `Correct! You used the expected expression for "${config.variableName}".`
            : `Use the expression ${config.expectedExpression} to assign a value to "${config.variableName}".`,
    };
}