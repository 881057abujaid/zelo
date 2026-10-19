import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { colors } from "@/constants/colors";
import {
    getWorldChallenges,
    type WorldChallenge,
} from "@/features/worlds/worlds.service";

import { styles } from "./ChallengeDetailsScreen.styles";

interface ChallengeDetailsScreenProps {
    worldSlug: string;
    challengeSlug: string;
}

function formatDifficulty(difficulty: string) {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

export default function ChallengeDetailsScreen({
    worldSlug,
    challengeSlug,
}: ChallengeDetailsScreenProps) {
    const router = useRouter();

    const [challenge, setChallenge] =
        useState<WorldChallenge | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadChallenge = useCallback(async () => {
        try {
            setError(null);

            const challenges = await getWorldChallenges(worldSlug);

            const selectedChallenge = challenges.find(
                (item) => item.slug === challengeSlug,
            );

            if (!selectedChallenge) {
                setChallenge(null);
                setError("This challenge could not be found.");
                return;
            }

            setChallenge(selectedChallenge);
        } catch {
            setError(
                "We couldn't load this challenge. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }, [worldSlug, challengeSlug]);

    useEffect(() => {
        setLoading(true);
        setChallenge(null);
        void loadChallenge();
    }, [loadChallenge]);

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top", "bottom"]}
        >
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Pressable
                    accessibilityRole="button"
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>
                        ‹  Back to Challenges
                    </Text>
                </Pressable>

                {loading ? (
                    <View style={styles.stateContainer}>
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />

                        <Text style={styles.stateTitle}>
                            Loading mission...
                        </Text>
                    </View>
                ) : error ? (
                    <View style={styles.stateContainer}>
                        <Text style={styles.stateEmoji}>
                            🧩
                        </Text>

                        <Text style={styles.stateTitle}>
                            Mission unavailable
                        </Text>

                        <Text style={styles.stateDescription}>
                            {error}
                        </Text>

                        <Pressable
                            accessibilityRole="button"
                            onPress={() => {
                                setLoading(true);
                                void loadChallenge();
                            }}
                            style={styles.retryButton}
                        >
                            <Text style={styles.retryButtonText}>
                                Try Again
                            </Text>
                        </Pressable>
                    </View>
                ) : challenge ? (
                    <>
                        <View style={styles.hero}>
                            <Text style={styles.eyebrow}>
                                {worldSlug
                                    .split("-")
                                    .join(" ")
                                    .toUpperCase()}{" "}
                                WORLD
                            </Text>

                            <Text style={styles.missionLabel}>
                                YOUR MISSION
                            </Text>

                            <Text style={styles.title}>
                                {challenge.title}
                            </Text>

                            {challenge.description ? (
                                <Text style={styles.description}>
                                    {challenge.description}
                                </Text>
                            ) : null}

                            <View style={styles.metadata}>
                                <View style={styles.difficultyBadge}>
                                    <Text style={styles.difficultyText}>
                                        {formatDifficulty(
                                            challenge.difficulty,
                                        )}
                                    </Text>
                                </View>

                                <View style={styles.xpBadge}>
                                    <Text style={styles.xpText}>
                                        ⚡ {challenge.xpReward} XP
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>
                                Mission Brief
                            </Text>

                            <Text style={styles.instructions}>
                                {challenge.instructions}
                            </Text>
                        </View>

                        <View style={styles.infoCard}>
                            <Text style={styles.infoTitle}>
                                🎯 Ready to begin?
                            </Text>

                            <Text style={styles.infoDescription}>
                                Read the mission instructions carefully.
                                Your coding adventure starts in the next
                                stage.
                            </Text>
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            onPress={() => {
                                router.push({
                                    pathname: "/world/[slug]/challenge/[challengeSlug]/play",
                                    params: {
                                        slug: worldSlug,
                                        challengeSlug,
                                        title: challenge.title,
                                        description: challenge.description ?? "",
                                        instructions: challenge.instructions ?? "",
                                        difficulty: challenge.difficulty,
                                        xpReward: String(challenge.xpReward),
                                    },
                                });
                            }}
                            style={({ pressed }) => [
                                styles.startButton,
                                pressed && styles.startButtonPressed,
                            ]}
                        >
                            <Text style={styles.startButtonText}>
                                Start Challenge →
                            </Text>
                        </Pressable>
                    </>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
}