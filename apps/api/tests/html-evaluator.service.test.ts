import { describe, expect, it } from "vitest";
import {
    evaluateHtml,
    type HtmlTestCase,
} from "../src/modules/challenges/html-evaluator.service.js";

const testCases: HtmlTestCase[] = [
    {
        id: "test-1",
        title: "Contains a heading",
        input: {
            requiredElement: "h1",
        },
        expected: {
            containsElement: "h1",
        },
        isHidden: false,
        orderIndex: 1,
    },
    {
        id: "test-2",
        title: "Contains required text",
        input: {
            requiredText: "Welcome to ZELO!",
            requiredElement: "h1",
        },
        expected: {
            containsText: "Welcome to ZELO!",
            containsElement: "h1",
        },
        isHidden: false,
        orderIndex: 2,
    },
    {
        id: "test-3",
        title: "Contains paragraphs",
        input: {
            requiredElements: ["h1", "p"],
            minimumParagraphs: 2,
        },
        expected: {
            containsElements: ["h1", "p"],
            minimumParagraphs: 2,
        },
        isHidden: false,
        orderIndex: 3,
    },
];

describe("evaluateHtml", () => {
    it("should pass when all required HTML elements and text exist", () => {
        const result = evaluateHtml(
            `
                <h1>Welcome to ZELO!</h1>
                <p>First paragraph.</p>
                <p>Second paragraph.</p>
            `,
            testCases,
        );

        expect(result.passed).toBe(true);
        expect(result.totalTests).toBe(3);
        expect(result.passedTests).toBe(3);
        expect(result.failedTests).toBe(0);
    });

    it("should fail when a required element is missing", () => {
        const result = evaluateHtml(
            "<p>Welcome to ZELO!</p>",
            [testCases[1]],
        );

        expect(result.passed).toBe(false);
        expect(result.failedTests).toBe(1);
        expect(result.checks[0].message).toContain("h1");
    });

    it("should fail when required text is missing", () => {
        const result = evaluateHtml(
            "<h1>Hello World</h1>",
            [testCases[1]],
        );

        expect(result.passed).toBe(false);
        expect(result.checks[0].message).toBe(
            "Required text was not found.",
        );
    });

    it("should fail when there are not enough paragraphs", () => {
        const result = evaluateHtml(
            "<h1>My Profile</h1><p>About me.</p>",
            [testCases[2]],
        );

        expect(result.passed).toBe(false);
        expect(result.checks[0].message).toContain(
            "Expected at least 2 paragraph(s).",
        );
    });

    it("should return a failed result when no test cases exist", () => {
        const result = evaluateHtml("<h1>Hello</h1>", []);

        expect(result.passed).toBe(false);
        expect(result.totalTests).toBe(0);
    });

    it("should fail safely when a test case configuration is invalid", () => {
        const invalidTestCase: HtmlTestCase = {
            id: "invalid-1",
            title: "Invalid configuration",
            input: null,
            expected: null,
            isHidden: false,
            orderIndex: 1,
        };

        const result = evaluateHtml(
            "<h1>Hello</h1>",
            [invalidTestCase],
        );

        expect(result.passed).toBe(false);
        expect(result.checks[0].message).toBe(
            "Invalid test case configuration.",
        );
    });
});