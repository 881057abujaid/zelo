import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

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

    header: {
        alignItems: "center",
        marginTop: 34,
    },

    celebration: {
        fontSize: 34,
    },

    title: {
        marginTop: 4,
        fontSize: 32,
        lineHeight: 40,
        fontWeight: "800",
        color: colors.text,
    },

    subtitle: {
        marginTop: 8,
        textAlign: "center",
        fontSize: 15,
        lineHeight: 22,
        color: colors.textSecondary,
    },

    scoreCard: {
        marginTop: 28,
        alignSelf: "center",
        width: 170,
        height: 150,
        borderRadius: 24,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },

    score: {
        fontSize: 52,
        lineHeight: 58,
        fontWeight: "800",
        color: colors.primary,
    },

    scoreTotal: {
        marginTop: -4,
        fontSize: 20,
        fontWeight: "700",
        color: colors.textSecondary,
    },

    scoreLabel: {
        marginTop: 8,
        fontSize: 13,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    levelSection: {
        marginTop: 24,
    },

    levelLabel: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    level: {
        marginTop: 5,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "800",
        color: colors.text,
    },

    progressTrack: {
        height: 10,
        marginTop: 14,
        borderRadius: 5,
        backgroundColor: "#E2E8F0",
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 5,
        backgroundColor: colors.primary,
    },

    percentage: {
        marginTop: 6,
        textAlign: "right",
        fontSize: 12,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    recommendation: {
        marginTop: 22,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors.primaryLight,
    },

    recommendationTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: colors.primaryDark,
    },

    recommendationText: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 21,
        color: colors.text,
    },

    actions: {
        flex: 1,
        justifyContent: "flex-end",
        paddingTop: 20,
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

    primaryButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.surface,
    },

    arrow: {
        marginLeft: 10,
        fontSize: 22,
        color: colors.surface,
    },
});