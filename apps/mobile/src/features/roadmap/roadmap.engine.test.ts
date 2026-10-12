import { describe, it, expect } from "vitest";
import { generateRoadmap } from "./roadmap.engine";
import type {
    AssessmentResults,
    OnboardingGoal,
    ExperienceLevel,
} from "../onboarding/onboarding.store";

describe("generateRoadmap", () => {
    const goal: OnboardingGoal = "fullstack";
    const experienceLevel: ExperienceLevel = "complete-beginner";

    it("should generate a roadmap for the selected goal", () => {
        const roadmap = generateRoadmap(
            goal,
            experienceLevel,
            null,
        );

        expect(roadmap.goal).toBe(goal);
        expect(roadmap.experienceLevel).toBe(experienceLevel);
        expect(roadmap.nodes.length).toBeGreaterThan(0);
        expect(roadmap.missions.length).toBeGreaterThan(0);
    });

    it("should mark the first eligible mission as current", () => {
        const roadmap = generateRoadmap(
            goal,
            experienceLevel,
            null,
        );

        const currentMissions = roadmap.missions.filter(
            (mission) => mission.status === "current",
        );

        expect(currentMissions).toHaveLength(1);
        expect(currentMissions[0].id).toBe("programming-variables");
    });

    it("should mark a completed mission as completed", () => {
        const roadmap = generateRoadmap(
            goal,
            experienceLevel,
            null,
            ["programming-variables"],
        );

        const completedMission = roadmap.missions.find(
            (mission) => mission.id === "programming-variables",
        );

        expect(completedMission?.status).toBe("completed");
    });

    it("should unlock the next mission when its prerequisites are completed", () => {
        const roadmap = generateRoadmap(
            goal,
            experienceLevel,
            null,
            ["programming-variables"],
        );

        const nextMission = roadmap.missions.find(
            (mission) => mission.id === "programming-conditions",
        );

        expect(nextMission?.status).toBe("current");
    });

    it("should keep missions with incomplete prerequisites locked", () => {
        const roadmap = generateRoadmap(
            goal,
            experienceLevel,
            null,
        );

        const lockedMission = roadmap.missions.find(
            (mission) => mission.id === "programming-conditions",
        );

        expect(lockedMission?.status).toBe("locked");
    });

    it("should include only domains relevant to the web goal", () => {
        const roadmap = generateRoadmap(
            "web",
            experienceLevel,
            null,
        );

        const allowedDomains = [
            "programming-fundamentals",
            "javascript",
            "frontend",
        ];

        expect(
            roadmap.nodes.every((node) =>
                allowedDomains.includes(node.skillDomain),
            ),
        ).toBe(true);
    });

    it("should accept assessment results", () => {
        const assessmentResults: AssessmentResults = {
            totalQuestions: 10,
            correctAnswers: 4,
            percentage: 40,
            skillScores: {
                javascript: {
                    totalQuestions: 5,
                    correctAnswers: 2,
                    percentage: 40,
                },
                frontend: {
                    totalQuestions: 5,
                    correctAnswers: 2,
                    percentage: 40,
                },
            },
        };

        const roadmap = generateRoadmap(
            goal,
            experienceLevel,
            assessmentResults,
        );

        expect(roadmap.missions.length).toBeGreaterThan(0);
    });

    it("should return no current mission when all missions are completed", () => {
        const initialRoadmap = generateRoadmap(
            goal,
            experienceLevel,
            null,
        );

        const completedMissionIds = initialRoadmap.missions.map(
            (mission) => mission.id,
        );

        const roadmap = generateRoadmap(
            goal,
            experienceLevel,
            null,
            completedMissionIds,
        );

        const currentMissions = roadmap.missions.filter(
            (mission) => mission.status === "current",
        );

        expect(currentMissions).toHaveLength(0);
        expect(
            roadmap.missions.every(
                (mission) => mission.status === "completed",
            ),
        ).toBe(true);
    });
});
