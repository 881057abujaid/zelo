import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
    },

    // Header
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 28,
    },

    headerText: {
        flex: 1,
        marginRight: 12,
    },

    greeting: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 6,
    },

    brandTitle: {
        fontSize: 25,
        fontWeight: "800",
        color: colors.text,
        letterSpacing: -0.6,
    },

    subtitle: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 7,
        lineHeight: 19,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 18,
        backgroundColor: colors.primaryLight,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },

    avatarText: {
        fontSize: 25,
    },

    // Stats
    statsContainer: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 32,
    },

    statCard: {
        flex: 1,
        minHeight: 116,
        paddingVertical: 16,
        paddingHorizontal: 8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
    },

    statIcon: {
        fontSize: 22,
        marginBottom: 7,
    },

    statValue: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.text,
    },

    statLabel: {
        fontSize: 11,
        color: colors.textSecondary,
        marginTop: 4,
    },

    // Sections
    section: {
        marginBottom: 30,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 14,
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 14,
    },

    sectionEmoji: {
        fontSize: 22,
        marginBottom: 14,
    },

    // Continue Learning
    learningCard: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 24,
        padding: 20,
    },

    learningTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    worldBadge: {
        backgroundColor: colors.primaryLight,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },

    worldBadgeText: {
        color: colors.primaryDark,
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 0.7,
    },

    difficulty: {
        fontSize: 10,
        fontWeight: "700",
        color: colors.textSecondary,
        letterSpacing: 0.5,
    },

    learningTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 8,
    },

    learningDescription: {
        fontSize: 13,
        lineHeight: 20,
        color: colors.textSecondary,
        marginBottom: 18,
    },

    challengeMeta: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        gap: 8,
    },

    metaText: {
        fontSize: 11,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    progressTrack: {
        width: "100%",
        height: 7,
        backgroundColor: colors.border,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
    },

    progressFill: {
        height: "100%",
        backgroundColor: colors.primary,
        borderRadius: 10,
    },

    continueButton: {
        minHeight: 52,
        paddingHorizontal: 18,
        borderRadius: 15,
        backgroundColor: colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    continueButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "800",
    },

    buttonArrow: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
    },

    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.99 }],
    },

    disabledButton: {
        opacity: 0.55,
    },

    // Daily Mission
    missionCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
    },

    missionIcon: {
        width: 54,
        height: 54,
        borderRadius: 17,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },

    missionEmoji: {
        fontSize: 27,
    },

    missionContent: {
        flex: 1,
    },

    missionTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 5,
    },

    missionDescription: {
        fontSize: 12,
        lineHeight: 18,
        color: colors.textSecondary,
    },

    missionProgress: {
        fontSize: 11,
        fontWeight: "700",
        color: colors.primaryDark,
        marginTop: 10,
        marginBottom: 6,
    },

    missionProgressTrack: {
        height: 5,
        borderRadius: 10,
        backgroundColor: colors.border,
        overflow: "hidden",
    },

    missionProgressFill: {
        height: "100%",
        borderRadius: 10,
        backgroundColor: colors.primary,
    },

    // Learning World
    worldCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 13,
        padding: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
    },

    worldIcon: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: colors.primaryLight,
        alignItems: "center",
        justifyContent: "center",
    },

    worldEmoji: {
        fontSize: 26,
    },

    worldContent: {
        flex: 1,
    },

    worldTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 5,
    },

    worldDescription: {
        fontSize: 12,
        lineHeight: 18,
        color: colors.textSecondary,
    },

    worldProgress: {
        fontSize: 11,
        color: colors.primaryDark,
        fontWeight: "700",
        marginTop: 8,
    },

    worldArrow: {
        fontSize: 22,
        color: colors.textSecondary,
    },

    bottomSpacing: {
        height: 12,
    },
});