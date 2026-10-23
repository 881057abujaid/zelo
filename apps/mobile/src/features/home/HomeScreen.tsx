import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { styles } from "./HomeScreen.styles";
import { useProgressStore } from "../progress/progressStore";
import { challengeData } from "../onboarding/Challenge/challengeData";

import {
    getServerProgress,
    type ServerProgress,
} from "../progress/serverProgress.service";

export default function HomeScreen() {
    const progress = useProgressStore();

    const [serverProgress, setServerProgress] =
        useState<ServerProgress | null>(null);

    const [isLoadingServerProgress, setIsLoadingServerProgress] =
        useState(true);

    const [serverProgressError, setServerProgressError] =
        useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        async function fetchProgress() {
            try {
                setIsLoadingServerProgress(true);
                setServerProgressError(null);

                const data = await getServerProgress();

                if (isActive) {
                    setServerProgress(data);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch server progress:",
                    error,
                );

                if (isActive) {
                    setServerProgressError(
                        "Unable to load your latest progress.",
                    );
                }
            } finally {
                if (isActive) {
                    setIsLoadingServerProgress(false);
                }
            }
        }

        void fetchProgress();

        return () => {
            isActive = false;
        };
    }, []);

    const totalChallenges =
        serverProgress?.totalChallenges ?? challengeData.length;

    const completedChallenges =
        serverProgress?.completedChallenges ??
        progress.completedChallenges.length;

    const displayedXp = serverProgress?.totalXp ?? progress.xp;

    const completionPercentage =
        serverProgress?.overallProgress ??
        (totalChallenges > 0
            ? Math.round(
                (completedChallenges / totalChallenges) * 100,
            )
            : 0);

    const playerLevel = Math.floor(displayedXp / 500) + 1;

    const nextChallenge =
        challengeData.find(
            (challenge) =>
                challenge.id === progress.currentChallengeId &&
                !progress.completedChallenges.includes(challenge.id),
        ) ??
        challengeData.find(
            (challenge) =>
                !progress.completedChallenges.includes(challenge.id),
        );

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
                        onPress={() => router.push("/profile")}
                    >
                        <Text style={styles.avatarText}>👨‍💻</Text>
                    </Pressable>
                </View>

                {/* Player Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Text style={styles.statIcon}>
                            ⚡
                        </Text>
                        <Text style={styles.statValue}>
                            {displayedXp}
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
                                {completedChallenges >= 3
                                    ? "Mission Completed! 🎉"
                                    : "Complete 3 challenges"}
                            </Text>

                            <Text style={styles.missionDescription}>
                                {completedChallenges >= 3
                                    ? "Great work! Keep learning and leveling up."
                                    : "Complete challenges to reach your mission goal."}
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
                            🌌
                        </Text>
                    </View>

                    {isLoadingServerProgress ? (
                        <Text style={styles.worldDescription}>
                            Loading your learning worlds...
                        </Text>
                    ) : serverProgressError && !serverProgress ? (
                        <Text style={styles.worldDescription}>
                            Unable to load your learning worlds. Please try again later.
                        </Text>
                    ) : serverProgress?.worldProgress?.length ? (
                        serverProgress.worldProgress.map((world) => (
                            <View
                                key={world.slug}
                                style={[styles.worldCard, { marginBottom: 12 }]}
                            >
                                {world.imageUrl ? (
                                    <Image
                                        source={{ uri: world.imageUrl }}
                                        style={styles.worldImage}
                                        resizeMode="cover"
                                        accessibilityLabel={`${world.title} world`}
                                    />
                                ) : (
                                    <View style={styles.worldImageFallback}>
                                        <Text style={styles.worldImageFallbackText}>
                                            🌍
                                        </Text>
                                    </View>
                                )}
                                <View style={styles.worldContent}>
                                    <Text style={styles.worldTitle}>
                                        {world.title}
                                    </Text>

                                    <Text style={styles.worldDescription}>
                                        {world.progressPercentage}% completed
                                    </Text>

                                    <Text style={styles.worldProgress}>
                                        {world.completedChallenges}/
                                        {world.totalChallenges} challenges completed
                                    </Text>

                                    <View
                                        style={[
                                            styles.progressTrack,
                                            {
                                                marginTop: 10,
                                                marginBottom: 0,
                                            },
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.progressFill,
                                                {
                                                    width: `${Math.max(
                                                        0,
                                                        Math.min(
                                                            100,
                                                            world.progressPercentage,
                                                        ),
                                                    )}%`,
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.worldDescription}>
                            No learning worlds are available yet. Start your adventure soon!
                        </Text>
                    )}

                </View>


                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
            </ScrollView>
        </SafeAreaView>
    );
}