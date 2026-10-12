import { javascriptQuestions } from "./questionBank/javascript";

export type AssessmentOption = {
    id: string;
    label: string;
    value: string;
};

export type SkillDomain =
    | "programming-fundamentals"
    | "javascript"
    | "frontend"
    | "backend"
    | "databases"
    | "fullstack";

export type QuestionDifficulty =
    | "easy"
    | "medium"
    | "hard";

export type AssessmentQuestion = {
    id: string;
    question: string;
    code?: string;
    options: AssessmentOption[];
    correctAnswer: string;

    skillDomain: SkillDomain;
    difficulty: QuestionDifficulty;
};

export const assessmentQuestions: AssessmentQuestion[] =
    javascriptQuestions;