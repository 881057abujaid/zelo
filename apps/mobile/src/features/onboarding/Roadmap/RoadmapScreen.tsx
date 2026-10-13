import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { styles } from "./RoadmapScreen.styles";

import { useAuthStore } from "@/features/auth/auth.store";
import { useOnboardingStore } from "@/features/onboarding/onboarding.store";
import { useProgressStore } from "@/features/progress/progressStore";

import { generateRoadmap } from "@/features/roadmap/roadmap.engine";

import type {
    MissionStatus,
    RoadmapNode,
} from "@/features/roadmap/roadmap.types";

export default function RoadmapScreen() {
    // Onboarding data
    const assessmentResults = useOnboardingStore((state) => state.assessmentResults);
    const selectedGoal = useOnboardingStore((state) => state.selectedGoal);
    const experienceLevel = useOnboardingStore((state) => state.experienceLevel);
    const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

    // Player progress
    const completedMissionIds = useProgressStore((state) => state.completedMissionIds);

    // Safe defaults in case onboarding data is missing
    const goal = selectedGoal ?? "fullstack";

    const playerExperienceLevel = experienceLevel ?? "complete-beginner";

    // Assessment summary
    const finalScore = assessmentResults?.correctAnswers ?? 0;
    const totalQuestions = assessmentResults?.totalQuestions ?? 0;
    const percentage = assessmentResults?.percentage ?? 0;

    const getLevel = () => {
        if (percentage >= 80) {
            return "Intermediate";
        }

        if (percentage >= 60) {
            return "Beginner+";
        }

        return "Beginner";
    };

    const level = getLevel();

    // Generate the roadmap dynamically
    const generatedRoadmap = generateRoadmap(
        goal,
        playerExperienceLevel,
        assessmentResults,
        completedMissionIds,
    );

    // Determine the overall status of each roadmap node
    const getNodeStatus = (node: RoadmapNode): MissionStatus => {
        const nodeMissions = node.missions.map((mission) =>
            generatedRoadmap.missions.find(
                (generatedMission) =>
                    generatedMission.id === mission.id,
            ),
        ).filter(
            (mission) => mission !== undefined,
        );

        if (nodeMissions.length === 0) {
            return "locked";
        }

        if (
            nodeMissions.every(
                (mission) => mission.status === "completed",
            )
        ) {
            return "completed";
        }

        if (
            nodeMissions.some(
                (mission) => mission.status === "current",
            )
        ) {
            return "current";
        }

        return "locked";
    };

    const getStatusIcon = (status: MissionStatus) => {
        switch (status) {
            case "completed":
                return "✓";

            case "current":
                return "→";

            case "locked":
                return "🔒";
        }
    };

    const handleStart = async () => {
        try {
            await completeOnboarding();
            router.replace("/(tabs)/home");
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.emoji}>🎯</Text>

                    <Text style={styles.title}>
                        Your Coding Roadmap
                    </Text>

                    <Text style={styles.subtitle}>
                        Personalized by Nova
                        {"\n"}
                        for your coding journey
                    </Text>
                </View>

                {/* Level Card */}
                <View style={styles.levelCard}>
                    <View style={styles.levelIcon}>
                        <Text style={styles.levelEmoji}>
                            🟢
                        </Text>
                    </View>

                    <View style={styles.levelInfo}>
                        <Text style={styles.levelLabel}>
                            YOUR CURRENT LEVEL
                        </Text>

                        <Text style={styles.level}>
                            {level}
                        </Text>
                    </View>

                    <View style={styles.scoreBadge}>
                        <Text style={styles.score}>
                            {finalScore}/{totalQuestions}
                        </Text>

                        <Text style={styles.scoreLabel}>
                            Score
                        </Text>
                    </View>
                </View>

                {/* Learning Path */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Your Learning Path
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Follow the path and level up 🚀
                    </Text>
                </View>

                {/* Generated Roadmap */}
                <View style={styles.roadmap}>
                    {generatedRoadmap.nodes.map((node, index) => {
                        const status = getNodeStatus(node);

                        return (
                            <View
                                key={node.id}
                                style={styles.roadmapItem}
                            >
                                {/* Timeline */}
                                <View style={styles.timeline}>
                                    <View
                                        style={[
                                            styles.node,
                                            status === "completed" &&
                                            styles.completedNode,
                                            status === "current" &&
                                            styles.currentNode,
                                            status === "locked" &&
                                            styles.lockedNode,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.nodeText,
                                                status === "completed" &&
                                                styles.completedNodeText,
                                            ]}
                                        >
                                            {getStatusIcon(status)}
                                        </Text>
                                    </View>

                                    {index <
                                        generatedRoadmap.nodes.length - 1 && (
                                            <View
                                                style={[
                                                    styles.connector,
                                                    status === "completed" &&
                                                    styles.completedConnector,
                                                ]}
                                            />
                                        )}
                                </View>

                                {/* Roadmap Card */}
                                <View
                                    style={[
                                        styles.roadmapCard,
                                        status === "current" &&
                                        styles.currentCard,
                                    ]}
                                >
                                    <Text style={styles.itemTitle}>
                                        {node.title}
                                    </Text>

                                    <Text style={styles.itemDescription}>
                                        {node.description}
                                    </Text>

                                    {status === "current" && (
                                        <View style={styles.currentBadge}>
                                            <Text
                                                style={styles.currentBadgeText}
                                            >
                                                CURRENT
                                            </Text>
                                        </View>
                                    )}

                                    {/* Missions inside each node */}
                                    {node.missions.map((mission) => {
                                        const generatedMission =
                                            generatedRoadmap.missions.find(
                                                (item) =>
                                                    item.id === mission.id,
                                            );

                                        const missionStatus =
                                            generatedMission?.status ??
                                            "locked";

                                        return (
                                            <View
                                                key={mission.id}
                                                style={{
                                                    marginTop: 12,
                                                }}
                                            >
                                                <Text
                                                    style={styles.itemDescription}
                                                >
                                                    {getStatusIcon(
                                                        missionStatus,
                                                    )}{" "}
                                                    {mission.title}
                                                </Text>

                                                <Text
                                                    style={styles.itemDescription}
                                                >
                                                    {mission.estimatedMinutes} min
                                                    {" · "}
                                                    {mission.difficulty}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        );
                    })}
                </View>

                {/* Nova Message */}
                <View style={styles.novaCard}>
                    <Text style={styles.novaTitle}>
                        Nova's Plan 💚
                    </Text>

                    <Text style={styles.novaText}>
                        {level === "Intermediate"
                            ? "You have a solid foundation. Let's strengthen your skills and progress toward building real-world MERN applications."
                            : level === "Beginner+"
                                ? "You already understand some JavaScript fundamentals. Let's strengthen your core skills and gradually move toward full-stack development."
                                : "We'll build your programming foundation step by step, starting with JavaScript and progressing toward complete MERN Stack applications."
                        }
                    </Text>
                </View>

                {/* CTA */}
                <Pressable
                    onPress={handleStart}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>
                        Start My Journey
                    </Text>

                    <Text style={styles.arrow}>
                        →
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}