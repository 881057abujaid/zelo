import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { styles } from "./MissionScreen.styles";
import { useOnboardingStore } from "@/features/onboarding/onboarding.store";
import { useProgressStore } from "@/features/progress/progressStore";
import { generateRoadmap } from "@/features/roadmap/roadmap.engine";

export default function MissionScreen() {
    const selectedGoal = useOnboardingStore((state) => state.selectedGoal);
    const experienceLevel = useOnboardingStore((state) => state.experienceLevel);
    const assessmentResults = useOnboardingStore((state) => state.assessmentResults);
    const completedMissionIds = useProgressStore((state) => state.completedMissionIds);

    const roadmap = generateRoadmap(
        selectedGoal ?? "fullstack",
        experienceLevel ?? "complete-beginner",
        assessmentResults,
        completedMissionIds
    );

    const currentMission = roadmap.missions.find((mission) => mission.status === "current");

    const handleStartMission = () => {
        if (!currentMission) {
            return;
        }

        router.push("/onboarding/challenge");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Mission Header */}
                <View style={styles.header}>
                    <Text style={styles.missionLabel}>
                        🎮 MISSION
                    </Text>

                    <Text style={styles.title}>
                        {currentMission?.title ?? "All Missions Completed!"}
                    </Text>

                    <Text style={styles.subtitle}>
                        {currentMission?.skillDomain
                            ?.replace(/-/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase()) ?? "Congratulations!"}
                    </Text>
                </View>

                {/* Difficulty */}
                <View style={styles.difficultyRow}>
                    <View style={styles.difficultyBadge}>
                        <Text style={styles.difficultyText}>
                            ⭐ {currentMission?.difficulty
                                ? currentMission.difficulty.charAt(0).toUpperCase()
                                + currentMission.difficulty.slice(1)
                                : "Completed"}
                        </Text>
                    </View>
                </View>

                {/* Mission Card */}
                <View style={styles.missionCard}>
                    <View style={styles.missionIcon}>
                        <Text style={styles.missionEmoji}>
                            🎯
                        </Text>
                    </View>

                    <Text style={styles.cardTitle}>
                        Your Mission
                    </Text>
                    <Text style={styles.cardDescription}>
                        {currentMission?.description
                            ?? "You have completed all available missions. Great work!"}
                    </Text>

                    {currentMission && (
                        <Text>
                            ⏱️ Estimated time: {currentMission.estimatedMinutes} minutes
                        </Text>
                    )}
                </View>

                {/* Learning Objectives */}
                <View style={styles.objectiveSection}>
                    <Text style={styles.sectionTitle}>
                        What you'll learn
                    </Text>

                    <View style={styles.objective}>
                        <Text style={styles.check}>✓</Text>
                        <Text style={styles.objectiveText}>
                            Understand {currentMission?.title ?? "your next mission"}
                        </Text>
                    </View>

                    <View style={styles.objective}>
                        <Text style={styles.check}>✓</Text>
                        <Text style={styles.objectiveText}>
                            Build your knowledge of{" "}
                            {currentMission?.skillDomain.replace(/-/g, " ") ?? "programming"}
                        </Text>
                    </View>

                    <View style={styles.objective}>
                        <Text style={styles.check}>✓</Text>
                        <Text style={styles.objectiveText}>
                            Complete the mission and earn XP
                        </Text>
                    </View>
                </View>

                {/* Reward */}
                <View style={styles.rewardCard}>
                    <View style={styles.rewardItem}>
                        <Text style={styles.rewardEmoji}>
                            🏆
                        </Text>
                        <View>
                            <Text style={styles.rewardLabel}>
                                REWARD
                            </Text>
                            <Text style={styles.rewardValue}>
                                +50 XP
                            </Text>
                        </View>
                    </View>

                    <View style={styles.rewardDivider} />

                    <View style={styles.rewardItem}>
                        <Text style={styles.rewardEmoji}>
                            ❤️
                        </Text>

                        <View>
                            <Text style={styles.rewardLabel}>
                                LIVES
                            </Text>
                            <Text style={styles.rewardValue}>
                                3
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Nova Message */}
                <View style={styles.novaCard}>
                    <Text style={styles.novaTitle}>
                        Nova says 💚
                    </Text>
                    <Text style={styles.novaText}>
                        Every developer starts somewhere.
                        Let's write your first line of code
                        and level up together!
                    </Text>
                </View>

                {/* Start Mission */}
                <Pressable
                    onPress={handleStartMission}
                    disabled={!currentMission}
                    style={[
                        styles.primaryButton,
                        !currentMission && { opacity: 0.5 },
                    ]}
                >
                    <Text style={styles.primaryButtonText}>
                        {currentMission ? "Start Mission" : "All Missions Completed"}
                    </Text>

                    <Text style={styles.arrow}>
                        {currentMission ? "→" : "✓"}
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}