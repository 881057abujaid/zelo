import { ScrollView, Pressable, Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./ChallengeScreen.styles";

export default function ChallengeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.challengeLabel}>
                        🎯 CHALLENGE 01
                    </Text>
                    <Text style={styles.title}>
                        Variables
                    </Text>
                    <Text style={styles.subtitle}>
                        JavaScript Foundations
                    </Text>
                </View>

                {/* Progress */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>
                            challenge 1 of 5
                        </Text>
                        <Text style={styles.xpText}>
                            +50 XP
                        </Text>
                    </View>

                    <View style={styles.progressTrack}>
                        <View style={styles.progressFill} />
                    </View>
                </View>

                {/* Task */}
                <View style={styles.taskCard}>
                    <View style={styles.taskIcon}>
                        <Text style={styles.taskEmoji}>
                            💡
                        </Text>
                    </View>

                    <Text style={styles.taskTitle}>
                        Your Task
                    </Text>
                    <Text style={styles.taskDescription}>
                        Create a variable called
                        <Text style={styles.inlineCode}>
                            {" name "}
                        </Text>
                        and store your name in it.
                    </Text>
                </View>

                {/* Example */}
                <View style={styles.exampleCard}>
                    <Text style={styles.exampleLabel}>
                        EXAMPLE
                    </Text>
                    <Text style={styles.codeText}>
                        {`const name = "Alex";`}
                    </Text>
                </View>

                {/* Editor */}
                <View style={styles.editorSection}>
                    <View style={styles.editorHeader}>
                        <Text style={styles.editorTitle}>
                            Your Code
                        </Text>
                        <Text style={styles.language}>
                            JavaScript
                        </Text>
                    </View>

                    <View style={styles.editor}>
                        <TextInput
                            style={styles.codeInput}
                            multiline
                            autoCapitalize="none"
                            autoCorrect={false}
                            spellCheck={false}
                            placeholder={`cont name = "Your name";`}
                            placeholderTextColor="#64748B"
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                {/* Run */}
                <Pressable style={styles.runButton}>
                    <Text style={styles.runIcon}>
                        ▶
                    </Text>
                    <Text style={styles.runButtonText}>
                        Run
                    </Text>
                </Pressable>

                {/* Lives */}
                <View style={styles.bottomInfo}>
                    <View style={styles.lives}>
                        <Text style={styles.livesText}>
                            ❤️ ❤️ ❤️
                        </Text>
                        <Text style={styles.livesLabel}>
                            3 lives remaining
                        </Text>
                    </View>

                    <View style={styles.reward}>
                        <Text style={styles.rewardText}>
                            🏆 +50 XP
                        </Text>
                    </View>
                </View>

                {/* Check Answer */}
                <Pressable style={styles.checkButton}>
                    <Text style={styles.checkButtonText}>
                        Check Answer
                    </Text>
                    <Text style={styles.arrow}>
                        →
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}