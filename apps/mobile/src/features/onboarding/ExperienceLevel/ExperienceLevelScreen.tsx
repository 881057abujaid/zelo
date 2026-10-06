import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import { styles } from "./ExperienceLevelScreen.styles";

type ExperienceLevel = {
    id: string;
    icon: string;
    title: string;
    description: string;
};

const experienceLevels: ExperienceLevel[] = [
    {
        id: "complete-beginner",
        icon: "🌱",
        title: "Complete Beginner",
        description: "I've never coded before",
    },
    {
        id: "beginner",
        icon: "💡",
        title: "Beginner",
        description: "I know the basics",
    },
    {
        id: "intermediate",
        icon: "🛠️",
        title: "Intermediate",
        description: "I've built some projects",
    },
    {
        id: "advanced",
        icon: "🚀",
        title: "Advanced",
        description: "I'm comfortable in coding",
    },
];

export default function ExperienceLevelScreen() {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const handleContinue = () => {
        if (!selectedLevel) {
            return;
        }

        router.push("/onboarding/assessment");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Progress */}
                <OnboardingProgress
                    currentStep={3}
                    totalSteps={4}
                />

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        What's your
                        {"\n"}
                        coding experience? 💻
                    </Text>
                    <Text style={styles.subtitle}>
                        This helps Nova personalize
                        {"\n"}
                        your learning path.
                    </Text>
                </View>

                {/* Experience Levels */}
                <View style={styles.levels}>
                    {experienceLevels.map((level) => {
                        const isSelected = selectedLevel === level.id;

                        return (
                            <Pressable
                                key={level.id}
                                onPress={() => setSelectedLevel(level.id)}
                                style={[
                                    styles.levelCard,
                                    isSelected && styles.levelCardSelected,
                                ]}
                            >
                                <View style={styles.iconContainer}>
                                    <Text style={styles.icon}>
                                        {level.icon}
                                    </Text>
                                </View>
                                <View style={styles.levelInfo}>
                                    <Text style={styles.levelTitle}>
                                        {level.title}
                                    </Text>
                                    <Text style={styles.levelDescription}>
                                        {level.description}
                                    </Text>
                                </View>

                                <View style={[
                                    styles.radio,
                                    isSelected && styles.radioSelected,
                                ]}>
                                    {isSelected && (
                                        <View style={styles.radioInner} />
                                    )}
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* Continue */}
                <View style={styles.actions}>
                    <Pressable
                        disabled={!selectedLevel}
                        onPress={handleContinue}
                        style={[
                            styles.primaryButton,
                            !selectedLevel && styles.primaryButtonDisabled,
                        ]}
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