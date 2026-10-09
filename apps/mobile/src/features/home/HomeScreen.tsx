import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { colors } from "@/constants/colors";
import { styles } from "./HomeScreen.styles";
import { useProgressStore } from "../progress/progressStore";
import { challengeData } from "../onboarding/Challenge/challengeData";

export default function HomeScreen() {
    const progress = useProgressStore();

    const totalChallenges = challengeData.length;
    const completedChallenges = progress.completedChallenges.length;

    const nextChallenge =
        challengeData.find(
            (challenge) =>
                challenge.id === progress.currentChallengeId &&
                !progress.completedChallenges.includes(challenge.id)
        ) ??
        challengeData.find(
            (challenge) =>
                !progress.completedChallenges.includes(challenge.id)
        );

    const completionPercentage = totalChallenges > 0 ? Math.round((completedChallenges / totalChallenges) * 100) : 0;
    const playerLevel = Math.floor(progress.xp / 500) + 1;

    return (
        <SafeAreaView
            style={styles.container}
            edges={["top"]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Welcome Header */}
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.greeting}>
                            Welcome back 👋
                        </Text>
                        <Text style={styles.brandTitle}>
                            Ready to level up?
                        </Text>
                        <Text style={styles.subtitle}>
                            Your coding adventure continues.
                        </Text>
                    </View>

                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Open profile"
                        style={styles.avatar}
                        onPress={() => {
                            // Profile screen will be connected later
                        }}
                    >
                        <Text style={styles.avatarText}>
                            👨‍💻
                        </Text>
                    </Pressable>
                </View>

                {/* Player Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>
                            ⚡
                        </Text>
                        <Text style={styles.statValue}>
                            {progress.xp}
                        </Text>
                        <Text style={styles.statLabel}>
                            Total XP
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>
                            🏆
                        </Text>
                        <Text style={styles.statValue}>
                            {playerLevel}
                        </Text>
                        <Text style={styles.statLabel}>
                            Level
                        </Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>
                            ❤️
                        </Text>
                        <Text style={styles.statValue}>
                            {progress.lives}
                        </Text>
                        <Text style={styles.statLabel}>
                            Lives
                        </Text>
                    </View>
                </View>

                {/* Continue Learning */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Continue Learning
                        </Text>
                        <Text style={styles.sectionEmoji}>
                            🎯
                        </Text>
                    </View>

                    <View style={styles.learningCard}>
                        <View style={styles.learningTopRow}>
                            <View style={styles.worldBadge}>
                                <Text style={styles.worldBadgeText}>
                                    JAVASCRIPT
                                </Text>
                            </View>
                            <Text style={styles.difficulty}>
                                BEGINNER
                            </Text>
                        </View>

                        <Text style={styles.learningTitle}>
                            {nextChallenge?.title ?? "All challenges completed!"}
                        </Text>
                        <Text style={styles.learningDescription}>
                            {nextChallenge ? nextChallenge.description : "Amazing work! You've completed this challenge set."}
                        </Text>

                        <View style={styles.challengeMeta}>
                            <Text style={styles.metaText}>
                                📚 {completedChallenges}/{totalChallenges} completed
                            </Text>
                            <Text style={styles.metaText}>
                                ⚡ {nextChallenge?.xp ?? 0} XP
                            </Text>
                        </View>

                        <View style={styles.progressTrack}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${completionPercentage}%`
                                    }
                                ]}
                            />
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            style={({ pressed }) => [
                                styles.continueButton,
                                pressed && styles.buttonPressed,
                                !nextChallenge && styles.disabledButton,
                            ]}
                            disabled={!nextChallenge}
                            onPress={() => router.push("/onboarding/challenge")}
                        >
                            <Text style={styles.continueButtonText}>
                                {nextChallenge ? "Continue Learning" : "Completed ✓"}
                            </Text>
                            {nextChallenge && (
                                <Text style={styles.buttonArrow}>
                                    →
                                </Text>
                            )}
                        </Pressable>
                    </View>
                </View>

                {/* Daily Mission Preview */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Daily Mission 🔥
                    </Text>

                    <View style={styles.missionCard}>
                        <View style={styles.missionIcon}>
                            <Text style={styles.missionEmoji}>
                                🎯
                            </Text>
                        </View>

                        <View style={styles.missionContent}>
                            <Text style={styles.missionTitle}>
                                Complete 3 challenges
                            </Text>

                            <Text style={styles.missionDescription}>
                                Keep learning and earn more XP.
                            </Text>

                            <Text style={styles.missionProgress}>
                                {Math.min(completedChallenges, 3)}/3 completed
                            </Text>

                            <View style={styles.missionProgressTrack}>
                                <View
                                    style={[
                                        styles.missionProgressFill,
                                        {
                                            width: `${(Math.min(completedChallenges, 3) / 3) * 100}%`,
                                        }
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Learning Worlds Preview */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Your Learning Journey
                        </Text>
                        <Text style={styles.sectionEmoji}>
                            🌍
                        </Text>
                    </View>

                    <View style={styles.worldCard}>
                        <View style={styles.worldIcon}>
                            <Text style={styles.worldEmoji}>
                                🟨
                            </Text>
                        </View>

                        <View style={styles.worldContent}>
                            <Text style={styles.worldTitle}>
                                JavaScript Foundations
                            </Text>
                            <Text style={styles.worldDescription}>
                                Variables, data types and more.
                            </Text>
                            <Text style={styles.worldProgress}>
                                {completionPercentage}/{totalChallenges} challenges completed
                            </Text>
                        </View>

                        <Text style={styles.worldArrow}>
                            →
                        </Text>
                    </View>
                </View>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
            </ScrollView>
        </SafeAreaView>
    );
}