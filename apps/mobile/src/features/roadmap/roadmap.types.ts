import type {
    OnboardingGoal,
    ExperienceLevel,
    SkillDomain,
} from "../onboarding/onboarding.store";

export type MissionStatus =
    | "completed"
    | "current"
    | "locked";

export type MissionDifficulty =
    | "easy"
    | "medium"
    | "hard";

export interface LearningMission {
    id: string;
    title: string;
    description: string;

    skillDomain: SkillDomain;

    difficulty: MissionDifficulty;

    estimatedMinutes: number;

    prerequisites: string[];
}

export interface RoadmapNode {
    id: string;
    title: string;
    description: string;

    skillDomain: SkillDomain;

    missions: LearningMission[];
}

export interface RoadmapConfig {
    goal: OnboardingGoal;
    experienceLevel: ExperienceLevel;

    weakSkills: SkillDomain[];
}

export interface RoadmapMission extends LearningMission {
    status: MissionStatus;
}

export interface GeneratedRoadmap {
    goal: OnboardingGoal;
    experienceLevel: ExperienceLevel;

    nodes: RoadmapNode[];

    missions: RoadmapMission[];
}