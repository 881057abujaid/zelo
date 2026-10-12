import type { Challenge } from "./engine/types";

export const challengeData: Challenge[] = [
    {
        id: "js-variables-01",
        missionId: "programming-variables",

        number: 1,
        total: 5,

        title: "Variables",
        category: "JavaScript Foundations",
        difficulty: "Beginner",

        type: "code",

        description: "Create a variable called name and store your name in it.",

        starterCode: `const name = "";`,

        example: `const name = "Alex";`,

        language: "javascript",

        xp: 50,
        lives: 3,

        validation: {
            type: "variable",
            variableName: "name",
            required: true,
            allowEmpty: false,
        }
    },
    {
        id: "js-variables-02",
        missionId: "programming-variables",

        number: 2,
        total: 5,

        title: "Constants",
        category: "JavaScript Foundations",
        difficulty: "Beginner",

        type: "code",

        description: "Create a constant called age and store the value 21 in it.",

        starterCode: `const age = ;`,

        example: `const age = 21;`,

        language: "javascript",

        xp: 50,
        lives: 3,

        validation: {
            type: "expectedValue",
            variableName: "age",
            expectedValue: 21,
        },
    },
    {
        id: "js-variables-03",
        missionId: "programming-variables",
        number: 3,
        total: 5,
        title: "Data Types",
        category: "JavaScript Foundations",
        difficulty: "Beginner",
        type: "code",
        description: "Create a variable called isDeveloper and store the boolean value true in it.",
        starterCode: `const isDeveloper = ;`,
        example: `const isDeveloper = true;`,
        language: "javascript",
        xp: 50,
        lives: 3,
        validation: {
            type: "expectedValue",
            variableName: "isDeveloper",
            expectedValue: true,
        },
    },
    {
        id: "js-variables-04",
        missionId: "programming-variables",
        number: 4,
        total: 5,
        title: "Operators",
        category: "JavaScript Foundations",
        difficulty: "Beginner",
        type: "code",
        description: "Create a variable called total and store the result of 10 + 5 in it.",
        starterCode: `const total = ;`,
        example: `const total = 10 + 5;`,
        language: "javascript",
        xp: 50,
        lives: 3,
        validation: {
            type: "expression",
            variableName: "total",
            expectedExpression: "10 + 5",
        },
    },
    {
        id: "js-variables-05",
        missionId: "programming-variables",
        number: 5,
        total: 5,
        title: "Conditions",
        category: "JavaScript Foundations",
        difficulty: "Beginner",
        type: "code",
        description: "Create a variable called message and store the value \"Adult\" in it.",
        starterCode: `const message = ;`,
        example: `const message = "Adult";`,
        language: "javascript",
        xp: 50,
        lives: 3,
        validation: {
            type: "expectedValue",
            variableName: "message",
            expectedValue: "Adult",
        },
    },
    {
        id: "js-conditions-01",
        missionId: "programming-conditions",
        number: 1,
        total: 3,
        title: "If Statement",
        category: "JavaScript Conditions",
        difficulty: "Beginner",
        type: "code",
        description: "Create a variable called age and store the value 20 in it.",
        starterCode: `const age = ;`,
        example: `const age = 20;`,
        language: "javascript",
        xp: 50,
        lives: 3,
        validation: {
            type: "expectedValue",
            variableName: "age",
            expectedValue: 20,
        },
    },
    {
        id: "js-conditions-02",
        missionId: "programming-conditions",
        number: 2,
        total: 3,
        title: "Comparison",
        category: "JavaScript Conditions",
        difficulty: "Beginner",
        type: "code",
        description: "Create a variable called isAdult and store the result of 20 >= 18 in it.",
        starterCode: `const isAdult = ;`,
        example: `const isAdult = 20 >= 18;`,
        language: "javascript",
        xp: 50,
        lives: 3,
        validation: {
            type: "expectedValue",
            variableName: "isAdult",
            expectedValue: true,
        },
    },
    {
        id: "js-conditions-03",
        missionId: "programming-conditions",
        number: 3,
        total: 3,
        title: "Conditional Logic",
        category: "JavaScript Conditions",
        difficulty: "Beginner",
        type: "code",
        description: 'Create a variable called message and store "Adult" when the age is 20.',
        starterCode: `const age = 20;\nconst message = ;`,
        example: `const age = 20;\nconst message = age >= 18 ? "Adult" : "Minor";`,
        language: "javascript",
        xp: 50,
        lives: 3,
        validation: {
            type: "expectedValue",
            variableName: "message",
            expectedValue: "Adult",
        },
    },
];