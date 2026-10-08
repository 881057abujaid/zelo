import { ScrollView, Pressable, Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { styles } from "./ChallengeScreen.styles";
import { challengeData } from "./challengeData";
import { executeCode } from "./engine/challengeRunner";
import { MockExecutor } from "./engine/executor/mockExecutor";
import { submitChallengeAndUpdateProgress } from "./engine/challengeService";
import { initialProgress } from "@/features/progress/progressState";

const challenge = challengeData;
const executor = new MockExecutor();

export default function ChallengeScreen() {
    const [code, setCode] = useState(challenge.starterCode);
    const [output, setOutput] = useState<string | null>(null);
    const [progress, setProgress] = useState(initialProgress);
    const [validation, setValidation] = useState<{
        isCorrect: boolean;
        message: string;
    } | null>(null);

    const handleRunCode = async () => {
        setOutput(null);

        const result = await executeCode(code, executor);

        if (result.status === "success") {
            setOutput(result.output);
            return;
        }

        setOutput(result.error ?? "Code execution failed");
    };

    const handleCheckAnswer = async () => {
        const { result, progress: updatedProgress } = await submitChallengeAndUpdateProgress(
            challenge,
            code,
            progress,
            executor
        );

        setProgress(updatedProgress);

        setValidation({
            isCorrect: result.isCorrect,
            message: result.isCorrect
                ? "Great job! challenge completed."
                : result.error ?? "Your answer is not correct.",
        });
    };

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
                        🎯 CHALLENGE {String(challenge.number).padStart(2, "0")}
                    </Text>
                    <Text style={styles.title}>
                        {challenge.title}
                    </Text>
                    <Text style={styles.subtitle}>
                        {challenge.category}
                    </Text>
                </View>

                {/* Progress */}
                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressLabel}>
                            challenge {challenge.number} of {challenge.total}
                        </Text>
                        <Text style={styles.xpText}>
                            +{challenge.xp} XP
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
                        {challenge.description}
                    </Text>
                </View>

                {/* Example */}
                <View style={styles.exampleCard}>
                    <Text style={styles.exampleLabel}>
                        EXAMPLE
                    </Text>
                    <Text style={styles.codeText}>
                        {challenge.example}
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
                            value={code}
                            onChangeText={setCode}
                            autoCapitalize="none"
                            autoCorrect={false}
                            spellCheck={false}
                            placeholder="Write your code here..."
                            placeholderTextColor="#64748B"
                            textAlignVertical="top"
                        />
                    </View>
                </View>

                {/* Run */}
                <Pressable
                    onPress={handleRunCode}
                    style={styles.runButton}
                >
                    <Text style={styles.runIcon}>
                        ▶
                    </Text>
                    <Text style={styles.runButtonText}>
                        Run
                    </Text>
                </Pressable>

                {output !== null && (
                    <View style={styles.outputSection}>
                        <View style={styles.outputHeader}>
                            <Text style={styles.outputTitle}>
                                Output
                            </Text>
                            <Text style={styles.outputStatus}>
                                ● Ready
                            </Text>
                        </View>

                        <View style={styles.outputConsole}>
                            <Text style={styles.outputText}>
                                {output}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Player Stats */}
                <View style={styles.statsCard}>
                    {/* Lives */}
                    <View style={styles.statItem}>
                        <Text style={styles.statIcon}>
                            ❤️
                        </Text>

                        <View style={styles.statContent}>
                            <Text style={styles.statValue}>
                                {progress.lives}
                            </Text>

                            <Text style={styles.statLabel}>
                                Lives Remaining
                            </Text>
                        </View>
                    </View>

                    {/* Divider */}
                    <View style={styles.statDivider} />

                    {/* Total XP */}
                    <View style={styles.statItem}>
                        <Text style={styles.statIcon}>
                            ⭐
                        </Text>

                        <View style={styles.statContent}>
                            <Text style={styles.statValue}>
                                {progress.xp}
                            </Text>

                            <Text style={styles.statLabel}>
                                Total XP
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Check Answer */}
                <Pressable
                    style={styles.checkButton}
                    onPress={handleCheckAnswer}
                >
                    <Text style={styles.checkButtonText}>
                        Check Answer
                    </Text>
                    <Text style={styles.arrow}>
                        →
                    </Text>
                </Pressable>

                {validation && (
                    <View style={[
                        styles.validationCard,
                        validation.isCorrect
                            ? styles.successCard
                            : styles.errorCard,
                    ]}>
                        <Text style={styles.validationIcon}>
                            {validation.isCorrect ? "🎉" : "💡"}
                        </Text>

                        <View style={styles.validationContent}>
                            <Text style={styles.validationTitle}>
                                {validation.isCorrect ? "Correct!" : "Not quite"}
                            </Text>
                            <Text style={styles.validationMessage}>
                                {validation.message}
                            </Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}