import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useState } from 'react';

import { styles } from './GoalSelectionScreen.styles';
import OnboardingProgress from '@/components/onboarding/OnboardingProgress';

type Goal = {
    id: string;
    icon: string;
    title: string;
    description: string;
};

const goals: Goal[] = [
    {
        id: 'web',
        icon: '🌐',
        title: 'Websites',
        description: 'Build modern web apps',
    },
    {
        id: 'mobile',
        icon: '📱',
        title: 'Mobile Apps',
        description: 'Create apps for users',
    },
    {
        id: 'backend',
        icon: '⚙️',
        title: 'Backend & APIs',
        description: 'Build powerful APIs',
    },
    {
        id: 'fullstack',
        icon: '🚀',
        title: 'Full-Stack',
        description: 'Build complete applications',
    },
];

export default function GoalSelectionScreen() {
    const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

    const handleContinue = () => {
        if (!selectedGoal) {
            return;
        }

        router.push('/onboarding/experience');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Progress */}
                <OnboardingProgress
                    currentStep={2}
                    totalSteps={4}
                />

                {/* Heading */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        What do you want
                        {'\n'}
                        to build? 🚀
                    </Text>

                    <Text style={styles.subtitle}>
                        Choose what excites you most.
                        {'\n'}
                        You can always change this later.
                    </Text>
                </View>

                {/* Goals */}
                <View style={styles.goals}>
                    {goals.map((goal) => {
                        const isSelected = selectedGoal === goal.id;

                        return (
                            <Pressable
                                key={goal.id}
                                onPress={() => setSelectedGoal(goal.id)}
                                style={[
                                    styles.goalCard,
                                    isSelected && styles.goalCardSelected,
                                ]}
                            >
                                <View style={styles.iconContainer}>
                                    <Text style={styles.icon}>
                                        {goal.icon}
                                    </Text>
                                </View>

                                <View style={styles.goalInfo}>
                                    <Text style={styles.goalTitle}>
                                        {goal.title}
                                    </Text>

                                    <Text style={styles.goalDescription}>
                                        {goal.description}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.radio,
                                        isSelected && styles.radioSelected,
                                    ]}
                                >
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
                        disabled={!selectedGoal}
                        onPress={handleContinue}
                        style={[
                            styles.primaryButton,
                            !selectedGoal && styles.primaryButtonDisabled,
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