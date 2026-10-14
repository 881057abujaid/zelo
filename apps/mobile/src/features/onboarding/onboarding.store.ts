import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type OnboardingGoal =
    | "web"
    | "mobile"
    | "backend"
    | "fullstack";

export type ExperienceLevel =
    | "complete-beginner"
    | "beginner"
    | "intermediate"
    | "advanced";

export type SkillDomain =
    | "programming-fundamentals"
    | "javascript"
    | "frontend"
    | "backend"
    | "databases"
    | "fullstack";

export interface SkillScore {
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;
}

export interface AssessmentResults {
    totalQuestions: number;
    correctAnswers: number;
    percentage: number;

    skillScores: Partial<
        Record<SkillDomain, SkillScore>
    >;
}

interface OnboardingState {
    // User selections
    selectedGoal: OnboardingGoal | null;
    experienceLevel: ExperienceLevel | null;

    // Assessment progress
    answers: Record<string, string>;
    currentQuestionIndex: number;
    assessmentResults: AssessmentResults | null;

    // Actions
    setSelectedGoal: (goal: OnboardingGoal) => void;
    setExperienceLevel: (level: ExperienceLevel) => void;

    setAnswer: (
        questionId: string,
        answerId: string,
    ) => void;

    setCurrentQuestionIndex: (index: number) => void;

    setAssessmentResults: (
        results: AssessmentResults,
    ) => void;

    resetAssessment: () => void;
    resetOnboarding: () => void;
}

const initialState = {
    selectedGoal: null,
    experienceLevel: null,
    answers: {} as Record<string, string>,
    currentQuestionIndex: 0,
    assessmentResults: null,
};

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            ...initialState,

            setSelectedGoal: (goal) => {
                set({
                    selectedGoal: goal,
                });
            },

            setExperienceLevel: (level) => {
                set({
                    experienceLevel: level,
                });
            },

            setAnswer: (questionId, answerId) => {
                set((state) => ({
                    answers: {
                        ...state.answers,
                        [questionId]: answerId,
                    },
                }));
            },

            setCurrentQuestionIndex: (index) => {
                set({
                    currentQuestionIndex: index,
                });
            },

            setAssessmentResults: (results) => {
                set({
                    assessmentResults: results,
                });
            },

            resetAssessment: () => {
                set({
                    answers: {},
                    currentQuestionIndex: 0,
                    assessmentResults: null,
                });
            },

            resetOnboarding: () => {
                set(initialState);
            },
        }),
        {
            name: "zelo-onboarding-storage",
            storage: createJSONStorage(() => AsyncStorage),

            partialize: (state) => ({
                selectedGoal: state.selectedGoal,
                experienceLevel: state.experienceLevel,
                answers: state.answers,
                currentQuestionIndex: state.currentQuestionIndex,
                assessmentResults: state.assessmentResults,
            }),
        },
    ),
);