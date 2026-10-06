import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { styles } from "./RoadmapScreen.styles";

const roadmapItems = [
    {
        id: "1",
        title: "JavaScript Foundations",
        description: "Build your core coding foundation",
        status: "completed",
        icon: "✓",
    },
    {
        id: "2",
        title: "Core JavaScript",
        description: "Strengthen your JavaScript fundamentals",
        status: "current",
        icon: "→",
    },
    {
        id: "3",
        title: "Async JavaScript",
        description: "Master promises, async/await and APIs",
        status: "locked",
        icon: "🔒",
    },
    {
        id: "4",
        title: "React Fundamentals",
        description: "Build interactive user interfaces",
        status: "locked",
        icon: "🔒",
    },
    {
        id: "5",
        title: "Node.js & Express",
        description: "Build powerful backend applications",
        status: "locked",
        icon: "🔒",
    },
    {
        id: "6",
        title: "APIs & Databases",
        description: "Connect your applications to real data",
        status: "locked",
        icon: "🔒",
    },
    {
        id: "7",
        title: "Full-Stack Project",
        description: "Build your first complete application",
        status: "locked",
        icon: "🔒",
    },
];

export default function RoadmapScreen() {
    const handleStart = () => {
        router.push("/onboarding/mission");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.emoji}>🎯</Text>

                    <Text style={styles.title}>
                        Your Coding Roadmap
                    </Text>

                    <Text style={styles.subtitle}>
                        Personalized by Nova
                        {"\n"}
                        for your coding journey
                    </Text>
                </View>

                {/* Level Card */}
                <View style={styles.levelCard}>
                    <View style={styles.levelIcon}>
                        <Text style={styles.levelEmoji}>
                            🟢
                        </Text>
                    </View>

                    <View style={styles.levelInfo}>
                        <Text style={styles.levelLabel}>
                            YOUR CURRENT LEVEL
                        </Text>

                        <Text style={styles.level}>
                            Beginner+
                        </Text>
                    </View>

                    <View style={styles.scoreBadge}>
                        <Text style={styles.score}>
                            4/5
                        </Text>

                        <Text style={styles.scoreLabel}>
                            Score
                        </Text>
                    </View>
                </View>

                {/* Learning Path */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        Your Learning Path
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                        Follow the path and level up 🚀
                    </Text>
                </View>

                {/* Roadmap */}
                <View style={styles.roadmap}>
                    {roadmapItems.map((item, index) => (
                        <View
                            key={item.id}
                            style={styles.roadmapItem}
                        >
                            <View style={styles.timeline}>
                                <View
                                    style={[
                                        styles.node,
                                        item.status === "completed" &&
                                        styles.completedNode,
                                        item.status === "current" &&
                                        styles.currentNode,
                                        item.status === "locked" &&
                                        styles.lockedNode,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.nodeText,
                                            item.status === "completed" &&
                                            styles.completedNodeText,
                                        ]}
                                    >
                                        {item.icon}
                                    </Text>
                                </View>

                                {index < roadmapItems.length - 1 && (
                                    <View
                                        style={[
                                            styles.connector,
                                            item.status === "completed" &&
                                            styles.completedConnector,
                                        ]}
                                    />
                                )}
                            </View>

                            <View
                                style={[
                                    styles.roadmapCard,
                                    item.status === "current" &&
                                    styles.currentCard,
                                ]}
                            >
                                <Text style={styles.itemTitle}>
                                    {item.title}
                                </Text>

                                <Text style={styles.itemDescription}>
                                    {item.description}
                                </Text>

                                {item.status === "current" && (
                                    <View style={styles.currentBadge}>
                                        <Text style={styles.currentBadgeText}>
                                            CURRENT
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Nova Message */}
                <View style={styles.novaCard}>
                    <Text style={styles.novaTitle}>
                        Nova's Plan 💚
                    </Text>

                    <Text style={styles.novaText}>
                        You already have a good foundation. We'll
                        strengthen your JavaScript skills first,
                        then gradually move toward building
                        real-world applications.
                    </Text>
                </View>

                {/* CTA */}
                <Pressable
                    onPress={handleStart}
                    style={styles.primaryButton}
                >
                    <Text style={styles.primaryButtonText}>
                        Start My Journey
                    </Text>

                    <Text style={styles.arrow}>
                        →
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}