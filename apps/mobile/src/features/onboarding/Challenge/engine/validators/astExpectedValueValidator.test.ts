import { describe, it, expect } from "vitest";

import { validateExpectedValueWithAST } from "./astExpectedValueValidator";
import type { ExpectedValueValidation } from "../types";

describe("AST Expected Value Validator", () => {
    it("should accept the correct numeric value", () => {
        const config: ExpectedValueValidation = {
            type: "expectedValue",
            variableName: "age",
            expectedValue: 21,
        };

        const result = validateExpectedValueWithAST(
            "const age = 21;",
            config
        );

        expect(result.isCorrect).toBe(true);
    });

    it("should reject an incorrect numeric value", () => {
        const config: ExpectedValueValidation = {
            type: "expectedValue",
            variableName: "age",
            expectedValue: 21,
        };

        const result = validateExpectedValueWithAST(
            "const age = 99;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should distinguish a number from a string", () => {
        const config: ExpectedValueValidation = {
            type: "expectedValue",
            variableName: "age",
            expectedValue: 21,
        };

        const result = validateExpectedValueWithAST(
            'const age = "21";',
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should accept the correct boolean value", () => {
        const config: ExpectedValueValidation = {
            type: "expectedValue",
            variableName: "isDeveloper",
            expectedValue: true,
        };

        const result = validateExpectedValueWithAST(
            "const isDeveloper = true;",
            config
        );

        expect(result.isCorrect).toBe(true);
    });

    it("should accept the correct string value", () => {
        const config: ExpectedValueValidation = {
            type: "expectedValue",
            variableName: "name",
            expectedValue: "Alex",
        };

        const result = validateExpectedValueWithAST(
            'const name = "Alex";',
            config
        );

        expect(result.isCorrect).toBe(true);
    });

    it("should reject a missing variable", () => {
        const config: ExpectedValueValidation = {
            type: "expectedValue",
            variableName: "age",
            expectedValue: 21,
        };

        const result = validateExpectedValueWithAST(
            "const score = 21;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should reject a variable without an initializer", () => {
        const config: ExpectedValueValidation = {
            type: "expectedValue",
            variableName: "age",
            expectedValue: 21,
        };

        const result = validateExpectedValueWithAST(
            "let age;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should reject invalid JavaScript syntax", () => {
        const config: ExpectedValueValidation = {
            type: "expectedValue",
            variableName: "age",
            expectedValue: 21,
        };

        const result = validateExpectedValueWithAST(
            "const age = ;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });
});