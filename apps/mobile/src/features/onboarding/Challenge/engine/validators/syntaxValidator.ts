import { parse } from "@babel/parser";

export type SyntaxValidationResult = {
    isValid: boolean;
    error?: string;
};

export function validateSyntax(
    code: string
): SyntaxValidationResult {
    try {
        parse(code, {
            sourceType: "script",
        });

        return {
            isValid: true,
        };
    } catch (error) {
        return {
            isValid: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Invalid JavaScript syntax.",
        };
    }
}