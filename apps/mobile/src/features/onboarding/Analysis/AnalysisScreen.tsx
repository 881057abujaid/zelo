import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import { useOnboardingStore } from "@/features/onboarding/onboarding.store";

import { styles } from "./AnalysisScreen.styles";

export default function AnalysisScreen() {
    const assessmentResults = useOnboardingStore((state) => state.assessmentResults);

    const finalScore = assessmentResults?.correctAnswers ?? 0;
    const totalQuestions = assessmentResults?.totalQuestions ?? 0;
    const percentage = assessmentResults?.percentage ?? 0;
    const javascriptScore = assessmentResults?.skillScores.javascript;

    // Determine the user's preliminary assessment level.
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

    // Generate feedback from the JavaScript assessment score.
    const getSkillFeedback = () => {
        if (
            !javascriptScore ||
            javascriptScore.totalQuestions === 0
        ) {
            return "Complete more JavaScript questions to evaluate your skill.";
        }

        if (javascriptScore.percentage >= 80) {
            return "Great work! You have a strong foundation in JavaScript. Let's apply your knowledge through practical coding missions.";
        }

        if (javascriptScore.percentage >= 60) {
            return "Good progress! You understand some JavaScript fundamentals. Keep practising to strengthen your skills.";
        }

        return "Let's strengthen your JavaScript fundamentals step by step through interactive lessons and practice missions.";
    };

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

                {/* Header */}
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

                {/* Assessment Score */}
                <View style={styles.scoreCard}>
                    <Text style={styles.score}>
                        {finalScore}
                    </Text>

                    <Text style={styles.scoreTotal}>
                        / {totalQuestions}
                    </Text>

                    <Text style={styles.scoreLabel}>
                        Assessment Score
                    </Text>
                </View>

                {/* Overall Assessment Level */}
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

                {/* JavaScript Skill Assessment */}
                {javascriptScore && (
                    <View style={styles.levelSection}>
                        <Text style={styles.levelLabel}>
                            JavaScript Skills
                        </Text>

                        <Text style={styles.level}>
                            {javascriptScore.percentage}%
                        </Text>

                        <View style={styles.progressTrack}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${javascriptScore.percentage}%`,
                                    },
                                ]}
                            />
                        </View>

                        <Text style={styles.percentage}>
                            {javascriptScore.correctAnswers}
                            {" / "}
                            {javascriptScore.totalQuestions}
                            {" correct answers"}
                        </Text>
                    </View>
                )}

                {/* Personalized Recommendation */}
                <View style={styles.recommendation}>
                    <Text style={styles.recommendationTitle}>
                        Nova's Recommendation 💚
                    </Text>

                    <Text style={styles.recommendationText}>
                        {getSkillFeedback()}
                    </Text>
                </View>

                {/* Continue */}
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