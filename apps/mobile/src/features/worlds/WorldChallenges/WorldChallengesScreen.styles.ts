import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 36,
        flexGrow: 1,
    },

    header: {
        marginBottom: 26,
    },

    backButton: {
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingRight: 12,
        marginBottom: 28,
    },

    backButtonText: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: "700",
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 2,
        marginBottom: 10,
    },

    title: {
        color: colors.text,
        fontSize: 32,
        fontWeight: "800",
        letterSpacing: -0.8,
        marginBottom: 10,
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 15,
        lineHeight: 23,
        maxWidth: 340,
    },

    summary: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        marginTop: 22,
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderRadius: 12,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },

    summaryText: {
        color: colors.text,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0.6,
    },

    summaryDot: {
        color: colors.textSecondary,
        fontSize: 16,
        marginHorizontal: 9,
    },

    challengeCard: {
        padding: 18,
        marginBottom: 14,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },

    challengeTopRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    challengeNumber: {
        color: colors.textSecondary,
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 1.2,
    },

    xpBadge: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        backgroundColor: colors.primary + "18",
    },

    xpText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "800",
    },

    challengeTitle: {
        color: colors.text,
        fontSize: 19,
        fontWeight: "800",
        lineHeight: 26,
        marginBottom: 8,
    },

    challengeDescription: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        marginBottom: 18,
    },

    challengeBottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
    },

    difficultyBadge: {
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: 9,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },

    difficultyText: {
        color: colors.text,
        fontSize: 12,
        fontWeight: "700",
    },

    startLabel: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "800",
    },

    stateContainer: {
        flex: 1,
        minHeight: 250,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
        paddingVertical: 30,
    },

    stateEmoji: {
        fontSize: 42,
        marginBottom: 16,
    },

    stateTitle: {
        color: colors.text,
        fontSize: 19,
        fontWeight: "800",
        textAlign: "center",
        marginTop: 18,
        marginBottom: 8,
    },

    stateDescription: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
        maxWidth: 300,
    },

    retryButton: {
        marginTop: 22,
        paddingHorizontal: 24,
        paddingVertical: 13,
        borderRadius: 12,
        backgroundColor: colors.primary,
    },

    retryButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "800",
    },
});