import type { Challenge } from "./engine/types";

export const challengeData: Challenge = {
    id: "js-variables-01",
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
};