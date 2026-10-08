import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./worldCompletionScreen.style";

type worldCompletionScreenProps = {
    completedChallenges: number;
    xpEarned: number;
    onContinue: () => void;
};

export default function WorldCompletionScreen({
    completedChallenges,
    xpEarned,
    onContinue,
}: worldCompletionScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.card}>
                    <Text style={styles.trophy}>
                        🏆
                    </Text>
                    <Text style={styles.title}>
                        World Completed!
                    </Text>
                    <Text style={styles.subtitle}>
                        JavaScript Foundations
                    </Text>

                    <View style={styles.divider} />

                    <View style={styles.stats}>
                        <View style={styles.stat}>
                            <Text style={styles.statValue}>
                                {completedChallenges}
                            </Text>

                            <Text style={styles.statLabel}>
                                Challenges
                            </Text>
                        </View>

                        <View style={styles.stat}>
                            <Text style={styles.statValue}>
                                {xpEarned}
                            </Text>

                            <Text style={styles.statLabel}>
                                XP Earned
                            </Text>
                        </View>

                        <View style={styles.statDivider} />
                    </View>

                    <Text style={styles.message}>
                        Amazing work! You completed the
                        JavaScript Foundations world.
                    </Text>

                    <Pressable
                        style={styles.continueButton}
                        onPress={onContinue}
                    >
                        <Text style={styles.continueButtonText}>
                            Continue Journey
                        </Text>
                        <Text style={styles.arrow}>
                            →
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}