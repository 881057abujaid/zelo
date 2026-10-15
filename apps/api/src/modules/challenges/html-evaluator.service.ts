import * as cheerio from "cheerio";
import { prisma } from "@/config/prisma.js";

export interface HtmlTestCase {
    id: string;
    title: string;
    input: unknown;
    expected: unknown;
    isHidden: boolean;
    orderIndex: number;
}

export interface HtmlCheckResult {
    testCaseId: string;
    title: string;
    passed: boolean;
    message: string;
}

export interface HtmlEvaluationResult {
    passed: boolean;
    totalTests: number;
    passedTests: number;
    failedTests: number;
    checks: HtmlCheckResult[];
}

interface HtmlRequirements {
    requiredElement?: string;
    requiredElements?: string[];
    requiredText?: string;
    minimumParagraphs?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
    );
}

function parseRequirements(value: unknown): HtmlRequirements | null {
    if (!isRecord(value)) {
        return null;
    }

    const requirements: HtmlRequirements = {};

    if (typeof value.requiredElement === "string") {
        requirements.requiredElement = value.requiredElement;
    }

    if (
        Array.isArray(value.requiredElements) &&
        value.requiredElements.every(
            (element): element is string => typeof element === "string",
        )
    ) {
        requirements.requiredElements = value.requiredElements;
    }

    if (typeof value.requiredText === "string") {
        requirements.requiredText = value.requiredText;
    }

    if (typeof value.minimumParagraphs === "number") {
        requirements.minimumParagraphs = value.minimumParagraphs;
    }

    return requirements;
}

export function evaluateHtml(
    submission: string,
    testCases: HtmlTestCase[],
): HtmlEvaluationResult {
    const $ = cheerio.load(submission);

    const checks: HtmlCheckResult[] = [];

    for (const testCase of testCases) {
        const requirements = parseRequirements(testCase.input);

        if (!requirements) {
            checks.push({
                testCaseId: testCase.id,
                title: testCase.title,
                passed: false,
                message: "Invalid test case configuration.",
            });

            continue;
        }

        const requiredElements = [
            ...(requirements.requiredElement
                ? [requirements.requiredElement]
                : []),
            ...(requirements.requiredElements ?? []),
        ];

        const missingElements = requiredElements.filter(
            (selector) => $(selector).length === 0,
        );

        const textMatches =
            requirements.requiredText === undefined ||
            $.root().text().includes(requirements.requiredText);

        const paragraphCount = $("p").length;

        const paragraphsMatch =
            requirements.minimumParagraphs === undefined ||
            paragraphCount >= requirements.minimumParagraphs;

        const passed =
            missingElements.length === 0 &&
            textMatches &&
            paragraphsMatch;

        let message = "All requirements satisfied.";

        if (missingElements.length > 0) {
            message = `Missing required element(s): ${missingElements.join(", ")}.`;
        } else if (!textMatches) {
            message = "Required text was not found.";
        } else if (!paragraphsMatch) {
            message = `Expected at least ${requirements.minimumParagraphs} paragraph(s).`;
        }

        checks.push({
            testCaseId: testCase.id,
            title: testCase.title,
            passed,
            message,
        });
    }

    const passedTests = checks.filter((check) => check.passed).length;
    const failedTests = checks.length - passedTests;

    return {
        passed: checks.length > 0 && failedTests === 0,
        totalTests: checks.length,
        passedTests,
        failedTests,
        checks,
    };
}

export async function evaluatePublishedHtmlChallenge(
    challengeId: string,
    submission: string,
): Promise<HtmlEvaluationResult> {
    const testCases = await prisma.challengeTestCase.findMany({
        where: {
            challengeId,
        },
        select: {
            id: true,
            title: true,
            input: true,
            expected: true,
            isHidden: true,
            orderIndex: true,
        },
        orderBy: {
            orderIndex: "asc",
        },
    });

    return evaluateHtml(submission, testCases);
}