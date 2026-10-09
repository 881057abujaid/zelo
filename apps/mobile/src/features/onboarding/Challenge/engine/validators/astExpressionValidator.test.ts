import { describe, it, expect } from "vitest";

import { validateExpressionWithAST } from "./astExpressionValidator";
import type { ExpressionValidation } from "../types";

describe("AST Expression Validator", () => {
    const config: ExpressionValidation = {
        type: "expression",
        variableName: "total",
        expectedExpression: "10 + 5",
    };

    it("should accept the expected expression", () => {
        const result = validateExpressionWithAST(
            "const total = 10 + 5;",
            config
        );

        expect(result.isCorrect).toBe(true);
    });

    it("should accept equivalent whitespace formatting", () => {
        const result = validateExpressionWithAST(
            "const total=10+5",
            config
        );

        expect(result.isCorrect).toBe(true);
    });

    it("should reject a different expression", () => {
        const result = validateExpressionWithAST(
            "const total = 10 + 6;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should reject a different expression with the same result", () => {
        const result = validateExpressionWithAST(
            "const total = 5 + 10;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should reject a literal instead of the expected expression", () => {
        const result = validateExpressionWithAST(
            "const total = 15;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should reject a missing variable", () => {
        const result = validateExpressionWithAST(
            "const score = 10 + 5;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should reject invalid JavaScript syntax", () => {
        const result = validateExpressionWithAST(
            "const total = ;",
            config
        );

        expect(result.isCorrect).toBe(false);
        expect(result.message).toBe(
            "Your code contains invalid JavaScript syntax."
        );
    });

    it("should reject a variable without an initializer", () => {
        const result = validateExpressionWithAST(
            "let total;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });
});