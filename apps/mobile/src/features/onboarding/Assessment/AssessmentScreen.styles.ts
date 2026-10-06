import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 16,
    },

    scrollContent: {
        paddingTop: 24,
        paddingBottom: 24,
    },

    header: {
        alignItems: "center",
    },

    title: {
        textAlign: "center",
        fontSize: 30,
        lineHeight: 38,
        fontWeight: "800",
        color: colors.text,
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 15,
        lineHeight: 22,
        color: colors.textSecondary,
    },

    questionHeader: {
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    questionNumber: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.textSecondary,
    },

    questionProgress: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    questionProgressActive: {
        width: 20,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary,
    },

    questionProgressDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#D1D5DB",
    },

    questionCard: {
        marginTop: 12,
        padding: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },

    question: {
        fontSize: 17,
        lineHeight: 25,
        fontWeight: "700",
        color: colors.text,
    },

    codeBlock: {
        marginTop: 14,
        padding: 14,
        borderRadius: 12,
        backgroundColor: "#0F172A",
    },

    code: {
        fontFamily: "monospace",
        fontSize: 14,
        lineHeight: 23,
        color: "#E2E8F0",
    },

    answers: {
        gap: 10,
        marginTop: 18,
    },

    answer: {
        minHeight: 58,
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 14,
        backgroundColor: colors.surface,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
    },

    answerSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primaryLight,
    },

    answerLabel: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },

    answerLabelSelected: {
        backgroundColor: colors.primary,
    },

    answerLabelText: {
        fontSize: 14,
        fontWeight: "800",
        color: colors.textSecondary,
    },

    answerLabelTextSelected: {
        color: colors.surface,
    },

    answerText: {
        flex: 1,
        marginLeft: 14,
        lineHeight: 16,
        fontWeight: "600",
        color: colors.text,
    },

    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#CBD5E1",
        alignItems: "center",
        justifyContent: "center",
    },

    radioSelected: {
        borderColor: colors.primary,
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },

    actions: {
        marginTop: 18,
        paddingBottom: 8,
    },

    primaryButton: {
        height: 56,
        borderRadius: 16,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    primaryButtonDisabled: {
        backgroundColor: "#CBD5E1"
    },

    primaryButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.surface,
    },

    arrow: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: "500",
        color: colors.surface,
    },
});