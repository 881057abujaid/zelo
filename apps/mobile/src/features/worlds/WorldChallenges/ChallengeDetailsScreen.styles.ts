import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingTop: 12,
        paddingBottom: 36,
    },

    backButton: {
        alignSelf: "flex-start",
        paddingVertical: 12,
        marginBottom: 28,
    },

    backButtonText: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: "700",
    },

    hero: {
        marginBottom: 32,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.5,
        marginBottom: 26,
    },

    missionLabel: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 2,
        marginBottom: 12,
    },

    title: {
        color: colors.text,
        fontSize: 32,
        lineHeight: 39,
        fontWeight: "800",
        letterSpacing: -0.7,
        marginBottom: 14,
    },

    description: {
        color: colors.textSecondary,
        fontSize: 16,
        lineHeight: 25,
    },

    metadata: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 22,
    },

    difficultyBadge: {
        paddingHorizontal: 13,
        paddingVertical: 9,
        borderRadius: 10,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },

    difficultyText: {
        color: colors.text,
        fontSize: 12,
        fontWeight: "800",
    },

    xpBadge: {
        paddingHorizontal: 13,
        paddingVertical: 9,
        borderRadius: 10,
        backgroundColor: colors.primary + "18",
    },

    xpText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "800",
    },

    section: {
        padding: 20,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 18,
    },

    sectionTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "800",
        marginBottom: 14,
    },

    instructions: {
        color: colors.textSecondary,
        fontSize: 15,
        lineHeight: 25,
    },

    infoCard: {
        padding: 18,
        borderRadius: 16,
        backgroundColor: colors.primary + "0D",
        borderWidth: 1,
        borderColor: colors.primary + "30",
        marginBottom: 24,
    },

    infoTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 8,
    },

    infoDescription: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 22,
    },

    startButton: {
        minHeight: 56,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        borderRadius: 14,
        backgroundColor: colors.primary,
    },

    startButtonPressed: {
        opacity: 0.85,
    },

    startButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "800",
    },

    stateContainer: {
        flex: 1,
        minHeight: 300,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 18,
    },

    stateEmoji: {
        fontSize: 42,
        marginBottom: 16,
    },

    stateTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
        marginTop: 18,
        marginBottom: 10,
    },

    stateDescription: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 22,
        textAlign: "center",
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