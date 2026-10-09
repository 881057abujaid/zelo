import { parse } from "@babel/parser";
import type { ExpressionValidation } from "../types";

export type ExpressionValidationResult = {
    isCorrect: boolean;
    message: string;
};

function getExpressionNode(code: string, variableName: string) {
    const ast = parse(code, {
        sourceType: "script",
    });

    for (const statement of ast.program.body) {
        if (statement.type !== "VariableDeclaration") {
            continue;
        }

        for (const declaration of statement.declarations) {
            if (
                declaration.id.type === "Identifier" &&
                declaration.id.name === variableName
            ) {
                return declaration.init;
            }
        }
    }

    return null;
}

function normalizeAst(node: unknown): string {
    if (!node || typeof node !== "object") {
        return JSON.stringify(node);
    }

    if (Array.isArray(node)) {
        return `[${node.map(normalizeAst).join(",")}]`;
    }

    const record = node as Record<string, unknown>;

    return `{${Object.keys(record)
        .filter(
            (key) =>
                key !== "start" &&
                key !== "end" &&
                key !== "loc" &&
                key !== "extra" &&
                key !== "comments" &&
                key !== "leadingComments" &&
                key !== "trailingComments" &&
                key !== "innerComments"
        )
        .sort()
        .map(
            (key) =>
                `${JSON.stringify(key)}:${normalizeAst(record[key])}`
        )
        .join(",")}}`;
}

export function validateExpressionWithAST(
    code: string,
    config: ExpressionValidation
): ExpressionValidationResult {
    let actualExpression;
    let expectedExpression;

    try {
        actualExpression = getExpressionNode(
            code,
            config.variableName
        );

        if (!actualExpression) {
            return {
                isCorrect: false,
                message: `Create a variable called "${config.variableName}".`,
            };
        }

        expectedExpression = getExpressionNode(
            `const ${config.variableName} = ${config.expectedExpression};`,
            config.variableName
        );
    } catch {
        return {
            isCorrect: false,
            message: "Your code contains invalid JavaScript syntax.",
        };
    }

    const isCorrect =
        normalizeAst(actualExpression) ===
        normalizeAst(expectedExpression);

    return {
        isCorrect,
        message: isCorrect
            ? `Correct! You used the expected expression for "${config.variableName}".`
            : `Use the expression ${config.expectedExpression} to assign a value to "${config.variableName}".`,
    };
}