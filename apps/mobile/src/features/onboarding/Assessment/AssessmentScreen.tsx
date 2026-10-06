import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import OnboardingProgress from '../../../components/onboarding/OnboardingProgress';
import { assessmentQuestions } from './assessmentQuestions';
import { styles } from './AssessmentScreen.styles';

export default function AssessmentScreen() {
    const [currentQuestionIndex, setCurrentQuestionIndex] =
        useState(0);

    const [selectedAnswer, setSelectedAnswer] =
        useState<string | null>(null);

    const [score, setScore] = useState(0);

    const currentQuestion =
        assessmentQuestions[currentQuestionIndex];

    const isLastQuestion =
        currentQuestionIndex === assessmentQuestions.length - 1;

    const handleContinue = () => {
        if (!selectedAnswer) {
            return;
        }

        const isCorrect =
            selectedAnswer === currentQuestion.correctAnswer;

        const newScore = isCorrect ? score + 1 : score;

        if (isLastQuestion) {
            router.push({
                pathname: "/onboarding/analysis",
                params: {
                    score: newScore.toString(),
                }
            });

            return;
        }

        setScore(newScore);
        setCurrentQuestionIndex(
            currentQuestionIndex + 1
        );
        setSelectedAnswer(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Onboarding Progress */}
                <OnboardingProgress
                    currentStep={4}
                    totalSteps={4}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            Let's test your
                            {'\n'}
                            coding skills 🧠
                        </Text>

                        <Text style={styles.subtitle}>
                            Don't worry — this isn't
                            {'\n'}
                            an exam.
                        </Text>
                    </View>

                    {/* Question Progress */}
                    <View style={styles.questionHeader}>
                        <Text style={styles.questionNumber}>
                            Question {currentQuestionIndex + 1} of{' '}
                            {assessmentQuestions.length}
                        </Text>

                        <View style={styles.questionProgress}>
                            {assessmentQuestions.map(
                                (_, index) => (
                                    <View
                                        key={index}
                                        style={
                                            index ===
                                                currentQuestionIndex
                                                ? styles.questionProgressActive
                                                : styles.questionProgressDot
                                        }
                                    />
                                )
                            )}
                        </View>
                    </View>

                    {/* Question */}
                    <View style={styles.questionCard}>
                        <Text style={styles.question}>
                            {currentQuestion.question}
                        </Text>

                        {currentQuestion.code && (
                            <View style={styles.codeBlock}>
                                <Text style={styles.code}>
                                    {currentQuestion.code}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Answers */}
                    <View style={styles.answers}>
                        {currentQuestion.options.map(
                            (option) => {
                                const isSelected =
                                    selectedAnswer === option.id;

                                return (
                                    <Pressable
                                        key={option.id}
                                        onPress={() =>
                                            setSelectedAnswer(
                                                option.id
                                            )
                                        }
                                        style={[
                                            styles.answer,
                                            isSelected &&
                                            styles.answerSelected,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.answerLabel,
                                                isSelected &&
                                                styles.answerLabelSelected,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.answerLabelText,
                                                    isSelected &&
                                                    styles.answerLabelTextSelected,
                                                ]}
                                            >
                                                {option.label}
                                            </Text>
                                        </View>

                                        <Text
                                            style={styles.answerText}
                                        >
                                            {option.value}
                                        </Text>

                                        <View
                                            style={[
                                                styles.radio,
                                                isSelected &&
                                                styles.radioSelected,
                                            ]}
                                        >
                                            {isSelected && (
                                                <View
                                                    style={
                                                        styles.radioInner
                                                    }
                                                />
                                            )}
                                        </View>
                                    </Pressable>
                                );
                            }
                        )}
                    </View>

                    {/* Continue */}
                    <View style={styles.actions}>
                        <Pressable
                            disabled={!selectedAnswer}
                            onPress={handleContinue}
                            style={[
                                styles.primaryButton,
                                !selectedAnswer &&
                                styles.primaryButtonDisabled,
                            ]}
                        >
                            <Text style={styles.primaryButtonText}>
                                {isLastQuestion
                                    ? 'Finish'
                                    : 'Continue'}
                            </Text>

                            <Text style={styles.arrow}>
                                →
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    );
}