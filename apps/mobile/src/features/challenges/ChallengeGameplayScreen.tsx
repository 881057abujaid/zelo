import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { LANGUAGES } from "./config/languages";
import type {
    LanguageConfig,
    LanguageId,
} from "./config/languages";

import CodeEditor from "./editor/CodeEditor";
import LanguageSelector from "./editor/LanguageSelector";
import HtmlPreview from "./preview/HtmlPreview";
import TestResults from "./results/TestResults";

import {
    submitChallenge,
} from "./challenges.service";

import type {
    ChallengeSubmissionResult,
} from "./challenges.service";

import { styles } from "./ChallengeGameplayScreen.styles";

interface ChallengeGameplayScreenProps {
    worldSlug: string;
    challengeSlug: string;
    title?: string;
    description?: string;
    instructions?: string;
    difficulty?: string;
    xpReward?: number;
}

export default function ChallengeGameplayScreen({
    worldSlug,
    challengeSlug,
    title,
    description,
    instructions,
    difficulty,
    xpReward,
}: ChallengeGameplayScreenProps) {
    const router = useRouter();

    const [selectedLanguage, setSelectedLanguage] =
        useState<LanguageId>("html");

    const [activeEditorTab, setActiveEditorTab] = useState<"html" | "css">(
        "html",
    );

    const [codeByLanguage, setCodeByLanguage] = useState<
        Partial<Record<LanguageId, string>>
    >({
        html: LANGUAGES.find(
            (language) => language.id === "html",
        )?.starterCode ?? "",
    });

    const [htmlCode, setHtmlCode] = useState(
        LANGUAGES.find((language) => language.id === "html")
            ?.starterCode ?? "",
    );

    const [cssCode, setCssCode] = useState(
        LANGUAGES.find((language) => language.id === "css")
            ?.starterCode ?? "",
    );

    const [result, setResult] =
        useState<ChallengeSubmissionResult | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [previewVisible, setPreviewVisible] = useState(true);

    const activeLanguage: LanguageConfig =
        LANGUAGES.find(
            (language) => language.id === selectedLanguage,
        ) ?? LANGUAGES[0];

    const currentCode =
        codeByLanguage[selectedLanguage] ??
        activeLanguage.starterCode;

    const isHtml = selectedLanguage === "html";

    const editorLanguageId =
        isHtml && activeEditorTab === "css" ? "css" : selectedLanguage;

    const editorLanguage =
        LANGUAGES.find((language) => language.id === editorLanguageId) ??
        LANGUAGES[0];

    const editorCode =
        isHtml && activeEditorTab === "css"
            ? cssCode
            : currentCode;

    const handleEditorCodeChange = (code: string) => {
        if (isHtml && activeEditorTab === "css") {
            setCssCode(code);
            setResult(null);
            setErrorMessage("");
            return;
        }

        updateCode(code);

        if (isHtml) {
            setHtmlCode(code);
        }
    };

    const updateCode = (code: string) => {
        setCodeByLanguage((previous) => ({
            ...previous,
            [selectedLanguage]: code,
        }));

        // Previous test results no longer describe the edited code.
        setResult(null);
        setErrorMessage("");
    };

    const handleLanguageSelect = (
        language: LanguageConfig,
    ) => {
        setSelectedLanguage(language.id);
        setErrorMessage("");
        setResult(null);
    };

    const handleSubmit = async () => {
        if (!isHtml || isSubmitting) {
            return;
        }

        if (!currentCode.trim()) {
            setErrorMessage("Write some HTML code before submitting.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");
        setResult(null);

        try {
            const response = await submitChallenge(
                challengeSlug,
                currentCode,
            );

            setResult(response.data);
        } catch (error: unknown) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Unable to submit your solution. Please try again.";

            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top", "bottom"]}
        >
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* Navigation */}
                <Pressable
                    accessibilityRole="button"
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>
                        ‹  Back to Mission
                    </Text>
                </Pressable>

                {/* Screen Header */}
                <View style={styles.header}>
                    <Text style={styles.eyebrow}>
                        {worldSlug.replace(/-/g, " ").toUpperCase()} WORLD
                    </Text>

                    <Text style={styles.title}>
                        Coding Arena
                    </Text>

                    <Text style={styles.subtitle}>
                        Write your solution, test it, and complete your
                        mission.
                    </Text>
                </View>

                {/* Challenge Information */}
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>
                        🎯 {title || challengeSlug.replace(/-/g, " ")}
                    </Text>

                    {!!description && (
                        <Text style={styles.infoDescription}>
                            {description}
                        </Text>
                    )}

                    {!!difficulty && (
                        <Text style={styles.infoMeta}>
                            Difficulty: {difficulty}
                        </Text>
                    )}

                    {xpReward !== undefined && (
                        <Text style={styles.infoMeta}>
                            ⚡ Reward: {xpReward} XP
                        </Text>
                    )}

                    <Text style={styles.infoDescription}>
                        {instructions ||
                            "Build your solution and submit it for evaluation."}
                    </Text>
                </View>

                {/* Language Selector */}
                <View style={styles.section}>
                    <LanguageSelector
                        languages={LANGUAGES}
                        selectedLanguage={selectedLanguage}
                        onSelect={handleLanguageSelect}
                    />
                </View>

                {/* Code Editor */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>
                        YOUR CODE
                    </Text>

                    {isHtml && (
                        <View style={styles.editorTabs}>
                            <Pressable
                                accessibilityRole="button"
                                accessibilityState={{
                                    selected: activeEditorTab === "html",
                                }}
                                onPress={() => setActiveEditorTab("html")}
                                style={[
                                    styles.editorTab,
                                    activeEditorTab === "html" &&
                                    styles.editorTabActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.editorTabText,
                                        activeEditorTab === "html" &&
                                        styles.editorTabTextActive,
                                    ]}
                                >
                                    HTML
                                </Text>
                            </Pressable>

                            <Pressable
                                accessibilityRole="button"
                                accessibilityState={{
                                    selected: activeEditorTab === "css",
                                }}
                                onPress={() => setActiveEditorTab("css")}
                                style={[
                                    styles.editorTab,
                                    activeEditorTab === "css" &&
                                    styles.editorTabActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.editorTabText,
                                        activeEditorTab === "css" &&
                                        styles.editorTabTextActive,
                                    ]}
                                >
                                    CSS
                                </Text>
                            </Pressable>
                        </View>
                    )}

                    <CodeEditor
                        language={editorLanguage}
                        value={editorCode}
                        onChange={handleEditorCodeChange}
                        editable={!isSubmitting}
                    />
                </View>

                {/* HTML Preview */}
                {isHtml && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeading}>
                                OUTPUT PREVIEW
                            </Text>

                            <Pressable
                                accessibilityRole="button"
                                onPress={() =>
                                    setPreviewVisible((previous) => !previous)
                                }
                                style={styles.secondaryButton}
                            >
                                <Text style={styles.secondaryButtonText}>
                                    {previewVisible ? "Hide" : "Show"}
                                </Text>
                            </Pressable>
                        </View>

                        {previewVisible && (
                            <HtmlPreview
                                html={htmlCode}
                                css={cssCode}
                                visible={previewVisible}
                            />
                        )}
                    </View>
                )}

                {/* Unsupported Runtime Notice */}
                {!isHtml && (
                    <View style={styles.noticeCard}>
                        <Text style={styles.noticeTitle}>
                            Editor mode
                        </Text>

                        <Text style={styles.noticeDescription}>
                            You can explore and edit this language, but
                            execution and submission are not available yet.
                            Your code stays in the editor while you switch
                            languages.
                        </Text>
                    </View>
                )}

                {/* Submit Solution */}
                <View style={styles.section}>
                    <Pressable
                        accessibilityRole="button"
                        disabled={!isHtml || isSubmitting}
                        onPress={handleSubmit}
                        style={[
                            styles.submitButton,
                            (!isHtml || isSubmitting) &&
                            styles.submitButtonDisabled,
                        ]}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.submitButtonText}>
                                Submit Solution  →
                            </Text>
                        )}
                    </Pressable>

                    {!!errorMessage && (
                        <View style={styles.errorCard}>
                            <Text style={styles.errorText}>
                                {errorMessage}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Evaluation Results */}
                {(result !== null || isSubmitting) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionHeading}>
                            EVALUATION RESULTS
                        </Text>

                        <TestResults
                            result={result}
                            loading={isSubmitting}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}