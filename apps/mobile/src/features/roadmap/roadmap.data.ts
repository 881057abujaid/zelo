import type {
    RoadmapNode,
} from "./roadmap.types";

export const roadmapData: RoadmapNode[] = [
    {
        id: "programming-fundamentals",
        title: "Programming Fundamentals",
        description: "Learn the building blocks of programming.",
        skillDomain: "programming-fundamentals",
        missions: [
            {
                id: "programming-variables",
                title: "Variables & Data Types",
                description: "Understand variables and primitive data types.",
                skillDomain: "programming-fundamentals",
                difficulty: "easy",
                estimatedMinutes: 10,
                prerequisites: [],
            },
            {
                id: "programming-conditions",
                title: "Conditions & Logic",
                description: "Make decisions using conditions and logical operators.",
                skillDomain: "programming-fundamentals",
                difficulty: "easy",
                estimatedMinutes: 15,
                prerequisites: ["programming-variables"],
            },
            {
                id: "programming-loops",
                title: "Loops & Iteration",
                description: "Repeat operations using loops.",
                skillDomain: "programming-fundamentals",
                difficulty: "medium",
                estimatedMinutes: 15,
                prerequisites: ["programming-conditions"],
            },
        ],
    },

    {
        id: "javascript-foundations",
        title: "JavaScript Foundations",
        description: "Build a strong foundation in JavaScript.",
        skillDomain: "javascript",
        missions: [
            {
                id: "javascript-variables",
                title: "JavaScript Variables",
                description: "Understand let, const, and variable scope.",
                skillDomain: "javascript",
                difficulty: "easy",
                estimatedMinutes: 10,
                prerequisites: ["programming-variables"],
            },
            {
                id: "javascript-functions",
                title: "Functions & Return Values",
                description: "Write reusable functions and return values.",
                skillDomain: "javascript",
                difficulty: "easy",
                estimatedMinutes: 15,
                prerequisites: ["javascript-variables"],
            },
            {
                id: "javascript-arrays",
                title: "Arrays & Array Methods",
                description: "Practise map, filter, find, and other array methods.",
                skillDomain: "javascript",
                difficulty: "medium",
                estimatedMinutes: 20,
                prerequisites: ["javascript-functions"],
            },
            {
                id: "javascript-async",
                title: "Asynchronous JavaScript",
                description: "Learn Promises, async/await, and asynchronous workflows.",
                skillDomain: "javascript",
                difficulty: "hard",
                estimatedMinutes: 25,
                prerequisites: ["javascript-functions"],
            },
        ],
    },

    {
        id: "frontend-development",
        title: "Frontend Development",
        description: "Build interactive user interfaces.",
        skillDomain: "frontend",
        missions: [
            {
                id: "frontend-html-css",
                title: "HTML & CSS",
                description: "Learn semantic HTML and modern CSS fundamentals.",
                skillDomain: "frontend",
                difficulty: "easy",
                estimatedMinutes: 20,
                prerequisites: ["javascript-variables"],
            },
            {
                id: "frontend-react",
                title: "React Fundamentals",
                description: "Build interfaces using components, props, and state.",
                skillDomain: "frontend",
                difficulty: "medium",
                estimatedMinutes: 25,
                prerequisites: [
                    "javascript-functions",
                    "javascript-arrays",
                ],
            },
        ],
    },

    {
        id: "backend-development",
        title: "Backend Development",
        description: "Build server-side applications and APIs.",
        skillDomain: "backend",
        missions: [
            {
                id: "backend-nodejs",
                title: "Node.js Fundamentals",
                description: "Understand the Node.js runtime and modules.",
                skillDomain: "backend",
                difficulty: "medium",
                estimatedMinutes: 20,
                prerequisites: ["javascript-async"],
            },
            {
                id: "backend-express",
                title: "Express & REST APIs",
                description: "Build HTTP endpoints and REST APIs with Express.",
                skillDomain: "backend",
                difficulty: "medium",
                estimatedMinutes: 25,
                prerequisites: ["backend-nodejs"],
            },
        ],
    },

    {
        id: "database-fundamentals",
        title: "Database Fundamentals",
        description: "Learn how applications store and retrieve data.",
        skillDomain: "databases",
        missions: [
            {
                id: "database-basics",
                title: "Database Basics",
                description: "Understand collections, documents, tables, and records.",
                skillDomain: "databases",
                difficulty: "easy",
                estimatedMinutes: 15,
                prerequisites: [],
            },
            {
                id: "database-mongodb",
                title: "MongoDB Fundamentals",
                description: "Create collections and perform basic CRUD operations.",
                skillDomain: "databases",
                difficulty: "medium",
                estimatedMinutes: 25,
                prerequisites: ["database-basics"],
            },
        ],
    },

    {
        id: "fullstack-project",
        title: "Full-Stack Development",
        description: "Connect frontend, backend, and database layers.",
        skillDomain: "fullstack",
        missions: [
            {
                id: "fullstack-integration",
                title: "Connect Frontend & Backend",
                description: "Consume backend APIs from a frontend application.",
                skillDomain: "fullstack",
                difficulty: "hard",
                estimatedMinutes: 30,
                prerequisites: [
                    "frontend-react",
                    "backend-express",
                ],
            },
            {
                id: "fullstack-project-build",
                title: "Build Your First Full-Stack Project",
                description: "Combine React, Node.js, Express, and MongoDB.",
                skillDomain: "fullstack",
                difficulty: "hard",
                estimatedMinutes: 45,
                prerequisites: [
                    "fullstack-integration",
                    "database-mongodb",
                ],
            },
        ],
    },
];