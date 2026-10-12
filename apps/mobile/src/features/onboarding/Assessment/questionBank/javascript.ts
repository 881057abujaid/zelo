import type { AssessmentQuestion } from "../assessmentQuestions";

export const javascriptQuestions: AssessmentQuestion[] = [
    {
        id: "js-q1",
        question: "What will this JavaScript code print?",
        code: `const x = 5;\nconst y = 2;\nconsole.log(x + y);`,
        options: [
            { id: "a", label: "A", value: "7" },
            { id: "b", label: "B", value: "10" },
            { id: "c", label: "C", value: "52" },
            { id: "d", label: "D", value: "3" },
        ],
        correctAnswer: "a",
        skillDomain: "javascript",
        difficulty: "easy",
    },
    {
        id: "js-q2",
        question: "Which keyword creates a block-scoped variable?",
        options: [
            { id: "a", label: "A", value: "var" },
            { id: "b", label: "B", value: "let" },
            { id: "c", label: "C", value: "define" },
            { id: "d", label: "D", value: "variable" },
        ],
        correctAnswer: "b",
        skillDomain: "javascript",
        difficulty: "easy",
    },
    {
        id: "js-q3",
        question: "What does this function return?",
        code: `function add(a, b) {\n    return a + b;\n}\n\nadd(3, 4);`,
        options: [
            { id: "a", label: "A", value: "34" },
            { id: "b", label: "B", value: "7" },
            { id: "c", label: "C", value: "undefined" },
            { id: "d", label: "D", value: "Error" },
        ],
        correctAnswer: "b",
        skillDomain: "javascript",
        difficulty: "easy",
    },
    {
        id: "js-q4",
        question: "Which array method creates a new array by transforming each item?",
        options: [
            { id: "a", label: "A", value: "forEach()" },
            { id: "b", label: "B", value: "find()" },
            { id: "c", label: "C", value: "map()" },
            { id: "d", label: "D", value: "push()" },
        ],
        correctAnswer: "c",
        skillDomain: "javascript",
        difficulty: "medium",
    },
    {
        id: "js-q5",
        question: "What does an async function return?",
        options: [
            { id: "a", label: "A", value: "A Promise" },
            { id: "b", label: "B", value: "A String" },
            { id: "c", label: "C", value: "A Callback" },
            { id: "d", label: "D", value: "Nothing" },
        ],
        correctAnswer: "a",
        skillDomain: "javascript",
        difficulty: "medium",
    },
];