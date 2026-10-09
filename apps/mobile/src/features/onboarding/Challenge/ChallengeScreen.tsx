import { ScrollView, Pressable, Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { router } from "expo-router";

import { styles } from "./ChallengeScreen.styles";
import { challengeData } from "./challengeData";
import { executeCode } from "./engine/challengeRunner";
import { MockExecutor } from "./engine/executor/mockExecutor";
import { submitChallengeAndUpdateProgress } from "./engine/challengeService";
import { useProgressStore } from "@/features/progress/progressStore";

const executor = new MockExecutor();

export default function ChallengeScreen() {
    const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

    const progress = useProgressStore();
    const challenge = challengeData[currentChallengeIndex];
    const progressPercentage = (challenge.number / challenge.total) * 100;

    const [code, setCode] = useState(challenge.starterCode);
    const [isOutofLives, setISOutofLives] = useState(false);
    const [output, setOutput] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [validation, setValidation] = useState<{
        isCorrect: boolean;
        message: string;
    } | null>(null);

    useEffect(() => {
        setCode(challenge.starterCode);
        setOutput(null);
        setValidation(null);
        setIsCompleted(false);
    }, [currentChallengeIndex]);

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
        const { result, progress: updatedProgress } =
            await submitChallengeAndUpdateProgress(
                challenge,
                code,
                progress,
                executor
            );

        progress.applyProgress(updatedProgress);

        setValidation({
            isCorrect: result.isCorrect,
            message: result.isCorrect
                ? `Great job! You earned ${result.xpEarned} XP.`
                : result.error ?? "Your answer is not correct.",
        });

        if (!result.isCorrect && updatedProgress.lives === 0) {
            setISOutofLives(true);
        }

        setIsCompleted(true);

        const isLastChallenge =
            currentChallengeIndex ===
            challengeData.length - 1;

        if (isLastChallenge) {
            router.replace({
                pathname: "/world-completion",
                params: {
                    completedChallenges:
                        updatedProgress.completedChallenges.length.toString(),

                    xpEarned:
                        updatedProgress.xp.toString(),
                },
            });
        }
    };

    const handleRetryChallenge = () => {
        progress.restoreLives();

        setCode(challenge.starterCode);
        setOutput(null);
        setValidation(null);
        setIsCompleted(false);
        setISOutofLives(false);
    }

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
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${progressPercentage}%` },
                            ]}
                        />
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
                    style={[
                        styles.checkButton,
                        (isCompleted || progress.lives <= 0) && styles.disabledButton,
                    ]}
                    disabled={isCompleted || progress.lives <= 0}
                    onPress={handleCheckAnswer}
                >
                    <Text style={styles.checkButtonText}>
                        {isCompleted ? "Challenge Completed ✓" : "Check Answer"}
                    </Text>
                    {!isCompleted && progress.lives > 0 && (
                        <Text style={styles.arrow}>
                            →
                        </Text>
                    )}
                </Pressable>

                {/* Validation */}
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

                {/* Out Of Lives */}
                {isOutofLives && (
                    <View style={styles.outOfLivesCard}>
                        <Text style={styles.outOfLivesIcon}>
                            💔
                        </Text>
                        <Text style={styles.outOfLivesTitle}>
                            Out of Lives
                        </Text>
                        <Text style={styles.outOfLivesMessage}>
                            You've used all your lives for this
                            challenge. Take a break and try again.
                        </Text>

                        {/* Retry Button */}
                        <Pressable
                            style={styles.retryButton}
                            onPress={handleRetryChallenge}
                        >
                            <Text style={styles.retryButtonText}>
                                Retry Challenge
                            </Text>
                            <Text style={styles.arrow}>
                                →
                            </Text>
                        </Pressable>
                    </View>
                )}

                {/* Next Challenge Navigation Button */}
                {isCompleted && currentChallengeIndex < challengeData.length - 1 && (
                    <Pressable
                        style={styles.nextButton}
                        onPress={() => {
                            const nextChallenge = challengeData[currentChallengeIndex + 1];

                            if (!nextChallenge) {
                                return;
                            }

                            setCurrentChallengeIndex(currentChallengeIndex + 1);
                            progress.setCurrentChallenge(nextChallenge.id);
                        }}
                    >
                        <Text style={styles.nextButtonText}>
                            Next Challenge
                        </Text>
                        <Text style={styles.arrow}>
                            →
                        </Text>
                    </Pressable>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}