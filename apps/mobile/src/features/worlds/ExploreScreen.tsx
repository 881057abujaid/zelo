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
import { getWorlds } from "@/features/worlds/worlds.service";
import type { World } from "@/features/worlds/worlds.service";

import { WorldCard } from "./components/WorldCard";
import { styles } from "./ExploreScreen.styles";

export default function ExploreScreen() {
    const router = useRouter();

    const [worlds, setWorlds] = useState<World[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadWorlds = useCallback(async () => {
        try {
            setError(null);

            const data = await getWorlds();

            setWorlds(data);
        } catch {
            setError("We couldn't load the worlds. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadWorlds();
    }, [loadWorlds]);

    const renderWorld = useCallback(
        ({ item, index }: { item: World; index: number }) => (
            <WorldCard
                world={item}
                index={index}
                onPress={(world) => {
                    router.push({
                        pathname: "/world/[slug]",
                        params: {
                            slug: world.slug,
                        },
                    });
                }}
            />
        ),
        [router],
    );

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top"]}
        >
            <FlatList
                data={worlds}
                keyExtractor={(item) => item.id}
                renderItem={renderWorld}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.eyebrow}>
                            YOUR LEARNING UNIVERSE
                        </Text>

                        <Text style={styles.title}>
                            Explore Worlds
                        </Text>

                        <Text style={styles.subtitle}>
                            Choose your world, master new skills, and
                            level up your coding journey.
                        </Text>

                        {!loading && !error && worlds.length > 0 && (
                            <Text style={styles.worldCount}>
                                {worlds.length} WORLDS TO EXPLORE
                            </Text>
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
                                    Discovering worlds...
                                </Text>

                                <Text style={styles.stateDescription}>
                                    Preparing your coding adventure.
                                </Text>
                            </>
                        ) : error ? (
                            <>
                                <Text style={styles.stateEmoji}>
                                    🌧️
                                </Text>

                                <Text style={styles.stateTitle}>
                                    Something went wrong
                                </Text>

                                <Text style={styles.stateDescription}>
                                    {error}
                                </Text>

                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => {
                                        setLoading(true);
                                        loadWorlds();
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
                                    🌍
                                </Text>

                                <Text style={styles.stateTitle}>
                                    New worlds are coming!
                                </Text>

                                <Text style={styles.stateDescription}>
                                    There are no published worlds to explore
                                    right now. Check back soon.
                                </Text>
                            </>
                        )}
                    </View>
                }
            />
        </SafeAreaView>
    );
}