export type ChallengeDifficulty =
    | "Beginner"
    | "Intermediate"
    | "Advanced";

export type ChallengeType =
    | "code"
    | "output"
    | "multiple-choice"
    | "debug";

export type ValidationConfig =
    | VariableValidation
    | OutputValidation
    | TestCaseValidation
    | ExpressionValidation;

export type VariableValidation = {
    type: "variable";
    variableName: string;
    required: boolean;
    allowEmpty?: boolean;
};

export type OutputValidation = {
    type: "output";
    expectedOutput: string;
};

export type TestCase = {
    id: string;
    input: unknown[];
    expectedOutput: unknown;
};

export type TestCaseValidation = {
    type: "testCases";
    functionName: string;
    testCases: TestCase[];
};

export type ExpressionValidation = {
    type: "expression";
    expectedValue: unknown;
};

export type Challenge = {
    id: string;

    number: number;
    total: number;

    title: string;
    category: string;
    difficulty: ChallengeDifficulty;

    type: ChallengeType;

    description: string;
    starterCode: string;
    example?: string;

    language?: "javascript" | "typescript";

    xp: number;
    lives: number;

    validation: ValidationConfig;
};

export type ChallengeResult = {
    challengeId: string;

    executed: boolean;
    isCorrect: boolean;

    output: string;

    error?: string;

    xpEarned: number;
    livesRemaining: number;

    executionTime?: number;
};