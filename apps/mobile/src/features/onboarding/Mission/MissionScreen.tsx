import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { styles } from "./MissionScreen.styles";

export default function MissionScreen() {
    const handleStartMission = () => {
        router.push("/onboarding/challenge");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Mission Header */}
                <View style={styles.header}>
                    <Text style={styles.missionLabel}>
                        🎮 MISSION 01
                    </Text>
                    <Text style={styles.title}>
                        JavaScript Foundations
                    </Text>
                    <Text style={styles.subtitle}>
                        Core JavaScript
                    </Text>
                </View>

                {/* Difficulty */}
                <View style={styles.difficultyRow}>
                    <View style={styles.difficultyBadge}>
                        <Text style={styles.difficultyText}>
                            ⭐ Beginner
                        </Text>
                    </View>
                </View>

                {/* Mission Card */}
                <View style={styles.missionCard}>
                    <View style={styles.missionIcon}>
                        <Text style={styles.missionEmoji}>
                            🎯
                        </Text>
                    </View>

                    <Text style={styles.cardTitle}>
                        Your Mission
                    </Text>
                    <Text style={styles.cardDescription}>
                        Learn how JavaScript variables work
                        and create your first variable.
                    </Text>
                </View>

                {/* Objective */}
                <View style={styles.objectiveSection}>
                    <Text style={styles.sectionTitle}>
                        What you'll learn
                    </Text>

                    <View style={styles.objective}>
                        <Text style={styles.check}>
                            ✓
                        </Text>
                        <Text style={styles.objectiveText}>
                            Understand JavaScript variables
                        </Text>
                    </View>

                    <View style={styles.objective}>
                        <Text style={styles.check}>
                            ✓
                        </Text>
                        <Text style={styles.objectiveText}>
                            Use let and const
                        </Text>
                    </View>

                    <View style={styles.objective}>
                        <Text style={styles.check}>
                            ✓
                        </Text>
                        <Text style={styles.objectiveText}>
                            Write your first piece of JavaScript
                        </Text>
                    </View>
                </View>

                {/* Reward */}
                <View style={styles.rewardCard}>
                    <View style={styles.rewardItem}>
                        <Text style={styles.rewardEmoji}>
                            🏆
                        </Text>
                        <View>
                            <Text style={styles.rewardLabel}>
                                REWARD
                            </Text>
                            <Text style={styles.rewardValue}>
                                +50 XP
                            </Text>
                        </View>
                    </View>

                    <View style={styles.rewardDivider} />

                    <View style={styles.rewardItem}>
                        <Text style={styles.rewardEmoji}>
                            ❤️
                        </Text>

                        <View>
                            <Text style={styles.rewardLabel}>
                                LIVES
                            </Text>
                            <Text style={styles.rewardValue}>
                                3
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Nova Message */}
                <View style={styles.novaCard}>
                    <Text style={styles.novaTitle}>
                        Nova says 💚
                    </Text>
                    <Text style={styles.novaText}>
                        Every developer starts somewhere.
                        Let's write your first line of code
                        and level up together!
                    </Text>
                </View>

                {/* Start Mission */}
                <Pressable
                    onPress={handleStartMission}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>
                        Start Mission
                    </Text>
                    <Text style={styles.arrow}>
                        →
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}