import { describe, it, expect } from "vitest";

import { validateVariableWithAST } from "./astVariableValidator";
import type { VariableValidation } from "../types";

describe("AST Variable Validator", () => {
    it("should accept a valid string variable", () => {
        const config: VariableValidation = {
            type: "variable",
            variableName: "name",
            required: true,
            allowEmpty: false,
        };

        const result = validateVariableWithAST(
            'const name = "Alex";',
            config
        );

        expect(result.isCorrect).toBe(true);
    });

    it("should accept a variable without a semicolon", () => {
        const config: VariableValidation = {
            type: "variable",
            variableName: "name",
            required: true,
            allowEmpty: false,
        };

        const result = validateVariableWithAST(
            'let name = "Alex"',
            config
        );

        expect(result.isCorrect).toBe(true);
    });

    it("should reject a missing variable", () => {
        const config: VariableValidation = {
            type: "variable",
            variableName: "name",
            required: true,
            allowEmpty: false,
        };

        const result = validateVariableWithAST(
            "const age = 21;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should reject a declaration without an initializer", () => {
        const config: VariableValidation = {
            type: "variable",
            variableName: "name",
            required: true,
            allowEmpty: false,
        };

        const result = validateVariableWithAST(
            "let name;",
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should reject invalid JavaScript syntax", () => {
        const config: VariableValidation = {
            type: "variable",
            variableName: "name",
            required: true,
            allowEmpty: false,
        };

        const result = validateVariableWithAST(
            "const name = ;",
            config
        );

        expect(result.isCorrect).toBe(false);
        expect(result.message).toBe(
            "Your code contains invalid JavaScript syntax."
        );
    });

    it("should reject an empty string when allowEmpty is false", () => {
        const config: VariableValidation = {
            type: "variable",
            variableName: "name",
            required: true,
            allowEmpty: false,
        };

        const result = validateVariableWithAST(
            'const name = "";',
            config
        );

        expect(result.isCorrect).toBe(false);
    });

    it("should accept an empty string when allowEmpty is true", () => {
        const config: VariableValidation = {
            type: "variable",
            variableName: "name",
            required: true,
            allowEmpty: true,
        };

        const result = validateVariableWithAST(
            'const name = "";',
            config
        );

        expect(result.isCorrect).toBe(true);
    });
});