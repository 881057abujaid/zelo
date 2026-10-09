import { parse } from "@babel/parser";
import type { VariableValidation } from "../types";

export type ValidationResult = {
    isCorrect: boolean;
    message: string;
};

export function validateVariableWithAST(
    code: string,
    config: VariableValidation
): ValidationResult {
    let ast;

    // Step 1: Parse JavaScript code
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

    // Step 2: Find the requested variable declaration
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

            // Step 3: Check whether a value was assigned
            if (!declaration.init) {
                return {
                    isCorrect: false,
                    message: `Store a value inside the "${config.variableName}" variable.`,
                };
            }

            // Step 4: Check whether an empty string is allowed
            if (!config.allowEmpty) {
                const initializer = declaration.init;

                const isEmptyString =
                    initializer.type === "StringLiteral" &&
                    initializer.value.trim() === "";

                if (isEmptyString) {
                    return {
                        isCorrect: false,
                        message: `Your "${config.variableName}" variable cannot be empty.`,
                    };
                }
            }

            // Step 5: Validation successful
            return {
                isCorrect: true,
                message: `Great job! You created the ${config.variableName} variable correctly.`,
            };
        }
    }

    // Step 6: Variable was not found
    return {
        isCorrect: false,
        message: `Create a variable called "${config.variableName}".`,
    };
}