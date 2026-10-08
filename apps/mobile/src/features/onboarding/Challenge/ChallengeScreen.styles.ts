import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 18,
        paddingBottom: 32,
    },

    header: {
        alignItems: "center",
    },

    challengeLabel: {
        fontSize: 13,
        fontWeight: "800",
        letterSpacing: 0.8,
        color: colors.primary,
    },

    title: {
        marginTop: 8,
        fontSize: 30,
        lineHeight: 38,
        fontWeight: "800",
        color: colors.text,
    },

    subtitle: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    progressSection: {
        marginTop: 24,
    },

    progressHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    progressLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    xpText: {
        fontSize: 12,
        fontWeight: "800",
        color: colors.primary,
    },

    progressTrack: {
        height: 8,
        marginTop: 8,
        borderRadius: 4,
        backgroundColor: "#E2E8F0",
        overflow: "hidden",
    },

    progressFill: {
        width: "20%",
        height: "100%",
        borderRadius: 4,
        backgroundColor: colors.primary,
    },

    taskCard: {
        marginTop: 24,
        padding: 18,
        borderRadius: 20,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },

    taskIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primaryLight,
    },

    taskEmoji: {
        fontSize: 23,
    },

    taskTitle: {
        marginTop: 14,
        fontSize: 20,
        fontWeight: "800",
        color: colors.text,
    },

    taskDescription: {
        marginTop: 7,
        fontSize: 15,
        lineHeight: 23,
        color: colors.textSecondary,
    },

    inlineCode: {
        fontWeight: "700",
        color: colors.primaryDark,
    },

    exampleCard: {
        marginTop: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#0F172A",
    },

    exampleLabel: {
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1,
        color: "#94A3B8",
    },

    codeText: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 21,
        fontFamily: "monospace",
        color: "#F8FAFC",
    },

    editorSection: {
        marginTop: 24,
    },

    editorHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 9,
    },

    editorTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: colors.text,
    },

    language: {
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 7,
        backgroundColor: colors.primaryLight,
        fontSize: 10,
        fontWeight: "700",
        color: colors.primaryDark,
    },

    editor: {
        minHeight: 190,
        borderRadius: 16,
        backgroundColor: "#0F172A",
        borderWidth: 1,
        borderColor: "#1E293B",
        overflow: "hidden",
    },

    codeInput: {
        minHeight: 190,
        padding: 16,
        fontSize: 15,
        lineHeight: 23,
        fontFamily: "monospace",
        color: "#F8FAFC",
    },

    runButton: {
        height: 50,
        marginTop: 14,
        borderRadius: 14,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    runIcon: {
        marginRight: 8,
        fontSize: 14,
        color: colors.primary,
    },

    runButtonText: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.text,
    },

    statsCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: 20,
        marginBottom: 16,

        paddingVertical: 16,
        paddingHorizontal: 18,

        backgroundColor: colors.surface,

        borderWidth: 1,
        borderColor: colors.border,

        borderRadius: 18,
    },

    statItem: {
        flex: 1,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 10,
    },

    statIcon: {
        fontSize: 24,
    },

    statContent: {
        alignItems: "flex-start",
    },

    statValue: {
        fontSize: 18,
        fontWeight: "800",
        color: colors.text,
    },

    statLabel: {
        marginTop: 2,

        fontSize: 11,
        fontWeight: "600",

        color: colors.textSecondary,
    },

    statDivider: {
        width: 1,
        height: 38,

        backgroundColor: colors.border,
    },

    checkButton: {
        height: 56,
        marginTop: 18,
        borderRadius: 16,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    checkButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.surface,
    },

    disabledButton: {
        opacity: 0.5,
    },

    nextButton: {
        marginTop: 12,
        minHeight: 54,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: colors.primary,
        borderRadius: 14,
    },

    nextButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    arrow: {
        marginLeft: 10,
        fontSize: 22,
        color: colors.surface,
    },

    outputSection: {
        marginTop: 18,
    },

    outputHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 9,
    },

    outputTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: colors.text,
    },

    outputStatus: {
        fontSize: 11,
        fontWeight: "700",
        color: colors.primary,
    },

    outputConsole: {
        minHeight: 100,
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#0F172A",
        borderWidth: 1,
        borderColor: "#1E293B",
    },

    outputText: {
        fontSize: 14,
        lineHeight: 21,
        fontFamily: "monospace",
        color: "#F8FAFC",
    },

    validationCard: {
        marginTop: 18,
        padding: 15,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
    },

    worldCompleteCard: {
        marginTop: 16,
        padding: 24,
        alignItems: "center",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
    },

    worldCompleteIcon: {
        fontSize: 48,
        marginTop: 12,
    },

    worldCompleteTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: colors.text,
    },

    worldCompleteSubtitle: {
        marginTop: 6,
        fontSize: 14,
        fontWeight: "800",
        color: colors.textSecondary,
    },

    worldCompleteStats: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 22,
        paddingTop: 18,
        borderTopWidth: 1,
        borderColor: colors.border,
    },

    worldStat: {
        flex: 1,
        alignItems: "center",
    },

    worldStatValue: {
        fontSize: 20,
        fontWeight: "800",
        color: colors.text,
    },

    worldStatLabel: {
        marginTop: 4,
        fontSize: 11,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    worldStatDivider: {
        width: 1,
        height: 32,
        backgroundColor: colors.border,
    },

    successCard: {
        backgroundColor: "#DCFCE7",
        borderColor: "#86EFAC",
    },

    errorCard: {
        backgroundColor: "#FEF3C7",
        borderColor: "#FCD34D",
    },

    validationIcon: {
        fontSize: 25,
    },

    validationContent: {
        flex: 1,
        marginLeft: 11,
    },

    validationTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: colors.text,
    },

    validationMessage: {
        marginTop: 3,
        fontSize: 13,
        lineHeight: 19,
        color: colors.textSecondary,
    },
});