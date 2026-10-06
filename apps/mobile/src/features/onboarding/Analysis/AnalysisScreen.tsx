import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import { styles } from "./AnalysisScreen.styles";

export default function AnalysisScreen() {
    const { score } = useLocalSearchParams<{ score?: string }>();

    const finalScore = Number(score ?? 0);
    const percentage = Math.round((finalScore / 5) * 100);

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

    const handleContinue = () => {
        router.push("/onboarding/roadmap");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                <OnboardingProgress
                    currentStep={4}
                    totalSteps={4}
                />

                <View style={styles.header}>
                    <Text style={styles.celebration}>
                        🎉
                    </Text>

                    <Text style={styles.title}>
                        Great job!
                    </Text>

                    <Text style={styles.subtitle}>
                        Here's what Nova
                        {"\n"}
                        discovered...
                    </Text>
                </View>

                <View style={styles.scoreCard}>
                    <Text style={styles.score}>
                        {finalScore}
                    </Text>

                    <Text style={styles.scoreTotal}>
                        / 5
                    </Text>

                    <Text style={styles.scoreLabel}>
                        Assessment Score
                    </Text>
                </View>

                <View style={styles.levelSection}>
                    <Text style={styles.levelLabel}>
                        Your current level
                    </Text>

                    <Text style={styles.level}>
                        🟢 {level}
                    </Text>

                    <View style={styles.progressTrack}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${percentage}%`,
                                },
                            ]}
                        />
                    </View>

                    <Text style={styles.percentage}>
                        {percentage}% mastery
                    </Text>
                </View>

                <View style={styles.recommendation}>
                    <Text style={styles.recommendationTitle}>
                        Nova's Recommendation 💚
                    </Text>

                    <Text style={styles.recommendationText}>
                        {level === "Intermediate"
                            ? "You have a solid foundation. Let's strengthen your skills and move toward building real-world projects."
                            : level === "Beginner+"
                                ? "You already understand the basics. Let's strengthen your JavaScript fundamentals and start building real projects."
                                : "We'll build your coding foundation step by step and turn learning into real progress."
                        }
                    </Text>
                </View>

                <View style={styles.actions}>
                    <Pressable
                        onPress={handleContinue}
                        style={styles.primaryButton}
                    >
                        <Text style={styles.primaryButtonText}>
                            Continue
                        </Text>

                        <Text style={styles.arrow}>
                            →
                        </Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    );
}