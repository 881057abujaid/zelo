import { parse } from "@babel/parser";
import type { ExpectedValueValidation } from "../types";

export type ExpectedValueValidationResult = {
    isCorrect: boolean;
    message: string;
};

export function validateExpectedValueWithAST(
    code: string,
    config: ExpectedValueValidation
): ExpectedValueValidationResult {
    let ast;

    // Step 1: Parse JavaScript
    try {
        ast = parse(code, {
            sourceType: "script",
        });
    } catch {
        return {
            isCorrect: false,
            message: "Your code contains invalid JavaScript syntax.",
        };
    }

    // Step 2: Find the requested variable
    for (const statement of ast.program.body) {
        if (statement.type !== "VariableDeclaration") {
            continue;
        }

        for (const declaration of statement.declarations) {
            if (
                declaration.id.type !== "Identifier" ||
                declaration.id.name !== config.variableName
            ) {
                continue;
            }

            // Step 3: Ensure the variable has an initializer
            if (!declaration.init) {
                return {
                    isCorrect: false,
                    message: `Create a variable called "${config.variableName}" with an assigned value.`,
                };
            }

            // Step 4: Compare the expected value
            const initializer = declaration.init;

            let actualValue: string | number | boolean | undefined;

            if (initializer.type === "StringLiteral") {
                actualValue = initializer.value;
            } else if (initializer.type === "NumericLiteral") {
                actualValue = initializer.value;
            } else if (initializer.type === "BooleanLiteral") {
                actualValue = initializer.value;
            }

            if (
                actualValue !== undefined &&
                typeof actualValue === typeof config.expectedValue &&
                actualValue === config.expectedValue
            ) {
                return {
                    isCorrect: true,
                    message: `Correct! The "${config.variableName}" variable has the expected value.`,
                };
            }

            return {
                isCorrect: false,
                message: `The "${config.variableName}" variable should contain the expected value.`,
            };
        }
    }

    // Step 5: Variable not found
    return {
        isCorrect: false,
        message: `Create a variable called "${config.variableName}".`,
    };
}