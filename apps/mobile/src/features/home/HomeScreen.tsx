import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";
import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { styles } from "./HomeScreen.styles";
import { useProgressStore } from "../progress/progressStore";

import {
    getServerProgress,
    type ServerProgress,
} from "../progress/serverProgress.service";

export default function HomeScreen() {
    const progress = useProgressStore();

    const resetDailyProgressIfNeeded = useProgressStore(
        (state) => state.resetDailyProgressIfNeeded,
    );

    const [serverProgress, setServerProgress] =
        useState<ServerProgress | null>(null);

    const [isLoadingServerProgress, setIsLoadingServerProgress] =
        useState(true);

    const [serverProgressError, setServerProgressError] =
        useState<string | null>(null);

    useFocusEffect(
        useCallback(() => {
            resetDailyProgressIfNeeded();
        }, [resetDailyProgressIfNeeded]),
    );

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

    const totalChallenges = serverProgress?.totalChallenges ?? 0;

    const completedChallenges =
        serverProgress?.completedChallenges ??
        progress.completedChallenges.length;

    const displayedXp = serverProgress?.totalXp ?? progress.xp;

    const dailyCompletedCount = progress.dailyCompletedChallengeIds.length;
    const dailyMissionTarget = 3;
    const dailyMissionProgress = Math.min(
        dailyCompletedCount,
        dailyMissionTarget,
    );

    const isDailyMissionCompleted =
        dailyCompletedCount >= dailyMissionTarget;

    const completionPercentage =
        serverProgress?.overallProgress ??
        (totalChallenges > 0
            ? Math.round(
                (completedChallenges / totalChallenges) * 100,
            )
            : 0);

    const playerLevel = Math.floor(displayedXp / 500) + 1;

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
                                {isDailyMissionCompleted
                                    ? "Mission Completed! 🎉"
                                    : "Complete 3 challenges"}
                            </Text>

                            <Text style={styles.missionDescription}>
                                {isDailyMissionCompleted
                                    ? "Great work! Keep learning and leveling up."
                                    : "Complete challenges to reach your mission goal."}
                            </Text>

                            <Text style={styles.missionProgress}>
                                {dailyMissionProgress}/{dailyMissionTarget} completed
                            </Text>

                            <View style={styles.missionProgressTrack}>
                                <View
                                    style={[
                                        styles.missionProgressFill,
                                        {
                                            width: `${(dailyMissionProgress / dailyMissionTarget) * 100
                                                }%`,
                                        },
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