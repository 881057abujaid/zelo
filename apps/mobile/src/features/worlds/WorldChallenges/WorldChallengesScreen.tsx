import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
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

import { styles } from "./WorldChallengesScreen.styles";

interface WorldChallengesScreenProps {
    slug: string;
}

function formatDifficulty(difficulty: string) {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}

export default function WorldChallengesScreen({
    slug,
}: WorldChallengesScreenProps) {
    const router = useRouter();

    const [challenges, setChallenges] = useState<WorldChallenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadChallenges = useCallback(async () => {
        try {
            setError(null);

            const data = await getWorldChallenges(slug);

            setChallenges(data);
        } catch {
            setError(
                "We couldn't load the challenges. Please try again.",
            );
        } finally {
            setLoading(false);
        }
    }, [slug]);

    useEffect(() => {
        setLoading(true);
        loadChallenges();
    }, [loadChallenges]);

    const renderChallenge = useCallback(
        ({ item, index }: { item: WorldChallenge; index: number }) => (
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Open challenge: ${item.title}`}
                onPress={() => {
                    router.push({
                        pathname: "/world/[slug]/challenge/[challengeSlug]",
                        params: {
                            slug,
                            challengeSlug: item.slug,
                        },
                    });
                }}
                style={({ pressed }) => [
                    styles.challengeCard,
                    pressed && { opacity: 0.85 },
                ]}
            >
                <View style={styles.challengeTopRow}>
                    <Text style={styles.challengeNumber}>
                        CHALLENGE {index + 1}
                    </Text>

                    <View style={styles.xpBadge}>
                        <Text style={styles.xpText}>
                            ⚡ {item.xpReward} XP
                        </Text>
                    </View>
                </View>

                <Text style={styles.challengeTitle}>
                    {item.title}
                </Text>

                {item.description ? (
                    <Text style={styles.challengeDescription}>
                        {item.description}
                    </Text>
                ) : null}

                <View style={styles.challengeBottomRow}>
                    <View style={styles.difficultyBadge}>
                        <Text style={styles.difficultyText}>
                            {formatDifficulty(item.difficulty)}
                        </Text>
                    </View>

                    <Text style={styles.startLabel}>
                        View Challenge →
                    </Text>
                </View>
            </Pressable>
        ),
        [router, slug],
    );

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top", "bottom"]}
        >
            <FlatList
                data={challenges}
                keyExtractor={(item) => item.id}
                renderItem={renderChallenge}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Go back"
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Text style={styles.backButtonText}>
                                ‹  Explore Worlds
                            </Text>
                        </Pressable>

                        <Text style={styles.eyebrow}>
                            YOUR NEXT ADVENTURE
                        </Text>

                        <Text style={styles.title}>
                            {slug
                                .split("-")
                                .map(
                                    (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1),
                                )
                                .join(" ")}
                        </Text>

                        <Text style={styles.subtitle}>
                            Complete challenges, earn XP, and level up
                            your coding skills.
                        </Text>

                        {!loading &&
                            !error &&
                            challenges.length > 0 && (
                                <View style={styles.summary}>
                                    <Text style={styles.summaryText}>
                                        {challenges.length} CHALLENGES
                                    </Text>

                                    <Text style={styles.summaryDot}>
                                        ·
                                    </Text>

                                    <Text style={styles.summaryText}>
                                        {
                                            challenges.reduce(
                                                (total, challenge) =>
                                                    total +
                                                    challenge.xpReward,
                                                0,
                                            )
                                        }{" "}
                                        TOTAL XP
                                    </Text>
                                </View>
                            )}
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.stateContainer}>
                        {loading ? (
                            <>
                                <ActivityIndicator
                                    size="large"
                                    color={colors.primary}
                                />

                                <Text style={styles.stateTitle}>
                                    Loading challenges...
                                </Text>

                                <Text style={styles.stateDescription}>
                                    Preparing your next coding mission.
                                </Text>
                            </>
                        ) : error ? (
                            <>
                                <Text style={styles.stateEmoji}>
                                    🌧️
                                </Text>

                                <Text style={styles.stateTitle}>
                                    Couldn't load challenges
                                </Text>

                                <Text style={styles.stateDescription}>
                                    {error}
                                </Text>

                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => {
                                        setLoading(true);
                                        loadChallenges();
                                    }}
                                    style={styles.retryButton}
                                >
                                    <Text style={styles.retryButtonText}>
                                        Try Again
                                    </Text>
                                </Pressable>
                            </>
                        ) : (
                            <>
                                <Text style={styles.stateEmoji}>
                                    🧩
                                </Text>

                                <Text style={styles.stateTitle}>
                                    Challenges coming soon!
                                </Text>

                                <Text style={styles.stateDescription}>
                                    This world doesn't have any published
                                    challenges yet. Check back soon.
                                </Text>
                            </>
                        )}
                    </View>
                }
            />
        </SafeAreaView>
    );
}