import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { styles } from "./ChallengeGameplayScreen.styles";

interface ChallengeGameplayScreenProps {
    worldSlug: string;
    challengeSlug: string;
}

export default function ChallengeGameplayScreen({
    worldSlug,
    challengeSlug,
}: ChallengeGameplayScreenProps) {
    const router = useRouter();

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top", "bottom"]}
        >
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Pressable
                    accessibilityRole="button"
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>
                        ‹  Back to Mission
                    </Text>
                </Pressable>

                <View style={styles.header}>
                    <Text style={styles.eyebrow}>
                        {worldSlug.replace(/-/g, " ").toUpperCase()} WORLD
                    </Text>

                    <Text style={styles.title}>
                        Coding Arena
                    </Text>

                    <Text style={styles.subtitle}>
                        Write your solution, test it, and complete your
                        mission.
                    </Text>
                </View>

                <View style={styles.editorPlaceholder}>
                    <View style={styles.editorHeader}>
                        <View style={styles.editorIndicator} />

                        <Text style={styles.editorLabel}>
                            HTML EDITOR
                        </Text>

                        <Text style={styles.editorLanguage}>
                            HTML
                        </Text>
                    </View>

                    <View style={styles.editorBody}>
                        <Text style={styles.editorIcon}>{"</>"}</Text>

                        <Text style={styles.editorTitle}>
                            Your coding workspace
                        </Text>

                        <Text style={styles.editorDescription}>
                            Challenge: {challengeSlug.replace(/-/g, " ")}
                        </Text>

                        <Text style={styles.editorDescription}>
                            The code editor will be added in the next step.
                        </Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>
                        🎯 Your mission
                    </Text>

                    <Text style={styles.infoDescription}>
                        Build your solution and submit it for evaluation.
                        Passing the challenge can earn XP.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}