import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 32,
    },

    header: {
        alignItems: "center",
    },

    missionLabel: {
        fontSize: 13,
        fontWeight: "800",
        letterSpacing: 1,
        color: colors.primary,
    },

    title: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 28,
        lineHeight: 36,
        fontWeight: "800",
        color: colors.text,
    },

    subtitle: {
        marginTop: 5,
        fontSize: 15,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    difficultyRow: {
        alignItems: "center",
        marginTop: 14,
    },

    difficultyBadge: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 10,
        backgroundColor: colors.primaryLight,
    },

    difficultyText: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.primaryDark,
    },

    missionCard: {
        marginTop: 28,
        padding: 20,
        borderRadius: 20,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
    },

    missionIcon: {
        width: 58,
        height: 58,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primaryLight,
    },

    missionEmoji: {
        fontSize: 28,
    },

    cardTitle: {
        marginTop: 14,
        fontSize: 20,
        fontWeight: "800",
        color: colors.text,
    },

    cardDescription: {
        marginTop: 8,
        textAlign: "center",
        fontSize: 14,
        lineHeight: 21,
        color: colors.textSecondary,
    },

    objectiveSection: {
        marginTop: 28,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: colors.text,
    },

    objective: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
    },

    check: {
        width: 24,
        height: 24,
        borderRadius: 12,
        textAlign: "center",
        lineHeight: 24,
        fontSize: 13,
        fontWeight: "800",
        color: colors.surface,
        backgroundColor: colors.primary,
        overflow: "hidden",
    },

    objectiveText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        lineHeight: 20,
        color: colors.text,
    },

    rewardCard: {
        marginTop: 28,
        padding: 16,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
    },

    rewardItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    rewardEmoji: {
        fontSize: 22,
        marginRight: 9,
    },

    rewardLabel: {
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 0.8,
        color: colors.textSecondary,
    },

    rewardValue: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: "800",
        color: colors.text,
    },

    rewardDivider: {
        width: 1,
        height: 34,
        backgroundColor: colors.border,
    },

    novaCard: {
        marginTop: 20,
        padding: 16,
        borderRadius: 18,
        backgroundColor: colors.primaryLight,
    },

    novaTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: colors.primaryDark,
    },

    novaText: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 21,
        color: colors.text,
    },

    primaryButton: {
        height: 56,
        marginTop: 20,
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