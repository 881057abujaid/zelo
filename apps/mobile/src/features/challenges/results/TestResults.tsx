import {
    ScrollView,
    Text,
    View,
} from "react-native";

import type { ChallengeSubmissionResult } from "../challenges.service";
import styles from "./TestResults.styles";

interface TestResultsProps {
    result: ChallengeSubmissionResult | null;
    loading?: boolean;
}

export default function TestResults({
    result,
    loading = false,
}: TestResultsProps) {
    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>
                    Evaluating your solution...
                </Text>
            </View>
        );
    }

    if (!result) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>
                    Ready to test your code?
                </Text>

                <Text style={styles.emptyDescription}>
                    Submit your solution to see the test results here.
                </Text>
            </View>
        );
    }

    const { evaluation, progress, unlockedAchievements } = result;

    const passedCount = evaluation.checks.filter(
        (check) => check.passed,
    ).length;

    const totalCount = evaluation.checks.length;

    return (
        <View style={styles.container}>
            {/* Overall Result */}
            <View
                style={[
                    styles.resultBanner,
                    evaluation.passed
                        ? styles.successBanner
                        : styles.failureBanner,
                ]}
            >
                <Text style={styles.resultIcon}>
                    {evaluation.passed ? "✓" : "!"}
                </Text>

                <View style={styles.resultTextContainer}>
                    <Text style={styles.resultTitle}>
                        {evaluation.passed
                            ? "Challenge Passed!"
                            : "Keep Trying!"}
                    </Text>

                    <Text style={styles.resultDescription}>
                        {passedCount} of {totalCount} tests passed
                    </Text>
                </View>
            </View>

            {/* XP Awarded */}
            <View style={styles.xpCard}>
                <Text style={styles.xpLabel}>
                    XP EARNED
                </Text>

                <Text style={styles.xpValue}>
                    +{progress.xpAwarded} XP
                </Text>

                <Text style={styles.xpDescription}>
                    {progress.isCompleted
                        ? "Challenge completed successfully."
                        : "Improve your solution and try again."}
                </Text>
            </View>

            {/* Test Cases */}
            <Text style={styles.sectionTitle}>
                TEST CASES
            </Text>

            <ScrollView
                style={styles.checksList}
                nestedScrollEnabled
            >
                {evaluation.checks.map((check) => (
                    <View
                        key={check.testCaseId}
                        style={styles.checkCard}
                    >
                        <View
                            style={[
                                styles.checkIcon,
                                check.passed
                                    ? styles.passedIcon
                                    : styles.failedIcon,
                            ]}
                        >
                            <Text style={styles.checkIconText}>
                                {check.passed ? "✓" : "✕"}
                            </Text>
                        </View>

                        <View style={styles.checkContent}>
                            <Text style={styles.checkTitle}>
                                {check.title}
                            </Text>

                            <Text style={styles.checkMessage}>
                                {check.message}
                            </Text>
                        </View>

                        <Text
                            style={[
                                styles.checkStatus,
                                check.passed
                                    ? styles.passedText
                                    : styles.failedText,
                            ]}
                        >
                            {check.passed ? "PASS" : "FAIL"}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Unlocked Achievements */}
            {unlockedAchievements.length > 0 && (
                <View style={styles.achievementSection}>
                    <Text style={styles.sectionTitle}>
                        🏆 ACHIEVEMENT UNLOCKED
                    </Text>

                    {unlockedAchievements.map((achievement) => (
                        <View
                            key={achievement.slug}
                            style={styles.achievementCard}
                        >
                            <Text style={styles.achievementTitle}>
                                {achievement.title}
                            </Text>

                            <Text style={styles.achievementSlug}>
                                {achievement.slug}
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}