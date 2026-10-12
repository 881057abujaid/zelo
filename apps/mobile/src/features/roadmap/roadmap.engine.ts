import type {
    OnboardingGoal,
    ExperienceLevel,
    SkillDomain,
    AssessmentResults,
} from "../onboarding/onboarding.store";

import { roadmapData } from "./roadmap.data";

import type {
    GeneratedRoadmap,
    MissionStatus,
    RoadmapConfig,
    RoadmapMission,
} from "./roadmap.types";

function getRelevantDomains(
    goal: OnboardingGoal,
): SkillDomain[] {
    switch (goal) {
        case "web":
            return [
                "programming-fundamentals",
                "javascript",
                "frontend",
            ];

        case "mobile":
            return [
                "programming-fundamentals",
                "javascript",
                "frontend",
            ];

        case "backend":
            return [
                "programming-fundamentals",
                "javascript",
                "backend",
                "databases",
            ];

        case "fullstack":
            return [
                "programming-fundamentals",
                "javascript",
                "frontend",
                "backend",
                "databases",
                "fullstack",
            ];
    }
}

function getWeakSkills(
    results: AssessmentResults | null,
): SkillDomain[] {
    if (!results) {
        return [];
    }

    return Object.entries(results.skillScores)
        .filter(([, score]) => (
            score !== undefined && score.percentage < 60
        ))
        .map(([domain]) => domain as SkillDomain);
}

export function generateRoadmap(
    goal: OnboardingGoal,
    experienceLevel: ExperienceLevel,
    assessmentResults: AssessmentResults | null,
    completedMissionIds: string[] = [],
): GeneratedRoadmap {
    const relevantDomains = getRelevantDomains(goal);
    const weakSkills = getWeakSkills(assessmentResults);

    const config: RoadmapConfig = {
        goal,
        experienceLevel,
        weakSkills,
    };

    const selectedNodes = roadmapData.filter((node) =>
        relevantDomains.includes(node.skillDomain),
    );

    // Keep the original curriculum order so prerequisites
    // remain predictable.
    const prioritizedNodes = [...selectedNodes];

    const allMissions = prioritizedNodes.flatMap(
        (node) => node.missions,
    );

    const availableMissionIds = new Set(
        allMissions.map((mission) => mission.id),
    );

    const completedIds = new Set(completedMissionIds);

    let currentMissionAssigned = false;

    const missions: RoadmapMission[] = allMissions.map((mission) => {
        const isCompleted = completedIds.has(mission.id);

        const prerequisitesCompleted = mission.prerequisites.every(
            (id) =>
                !availableMissionIds.has(id) ||
                completedIds.has(id),
        );

        let status: MissionStatus;

        if (isCompleted) {
            status = "completed";
        } else if (
            prerequisitesCompleted &&
            !currentMissionAssigned
        ) {
            status = "current";
            currentMissionAssigned = true;
        } else {
            status = "locked";
        }

        return {
            ...mission,
            status,
        };
    });

    return {
        goal: config.goal,
        experienceLevel: config.experienceLevel,
        nodes: prioritizedNodes,
        missions,
    };
}