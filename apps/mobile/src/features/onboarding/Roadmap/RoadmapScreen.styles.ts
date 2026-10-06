import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,

    },

    header: {
        alignItems: "center",
        marginTop: 20,
    },

    emoji: {
        fontSize: 34,
    },

    title: {
        marginTop: 8,
        textAlign: "center",
        fontSize: 28,
        lineHeight: 36,
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

    levelCard: {
        marginTop: 28,
        padding: 16,
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
    },

    levelIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primaryLight,
    },

    levelEmoji: {
        fontSize: 20,
    },

    levelInfo: {
        flex: 1,
        marginLeft: 12,
    },

    levelLabel: {
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.8,
        color: colors.textSecondary,
    },

    level: {
        marginTop: 2,
        fontSize: 20,
        fontWeight: "800",
        color: colors.text,
    },

    scoreBadge: {
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 12,
        backgroundColor: colors.primaryLight,
    },

    score: {
        fontSize: 16,
        fontWeight: "800",
        color: colors.primary,
    },

    scoreLabel: {
        marginTop: 1,
        fontSize: 10,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    sectionHeader: {
        marginTop: 30,
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: "800",
        color: colors.text,
    },

    sectionSubtitle: {
        marginTop: 4,
        fontSize: 13,
        color: colors.textSecondary,
    },

    roadmap: {
        gap: 0,
    },

    roadmapItem: {
        flexDirection: "row",
        minHeight: 88,
    },

    timeline: {
        width: 42,
        alignItems: "center",
    },

    node: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        zIndex: 1,
    },

    completedNode: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    currentNode: {
        backgroundColor: colors.primaryLight,
        borderColor: colors.primary,
        borderWidth: 2,
    },

    lockedNode: {
        backgroundColor: "#F1F5F9",
    },

    nodeText: {
        fontSize: 13,
        color: colors.textSecondary,
    },

    completedNodeText: {
        color: colors.surface,
        fontWeight: "800",
    },

    connector: {
        position: "absolute",
        top: 34,
        bottom: 0,
        width: 2,
        backgroundColor: colors.border,
    },

    completedConnector: {
        backgroundColor: colors.primary,
    },

    roadmapCard: {
        flex: 1,
        marginLeft: 12,
        marginBottom: 14,
        padding: 14,
        borderRadius: 16,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },

    currentCard: {
        borderColor: colors.primary,
        backgroundColor: colors.primaryLight,
    },

    itemTitle: {
        fontSize: 15,
        fontWeight: "800",
        color: colors.text,
    },

    itemDescription: {
        marginTop: 4,
        fontSize: 13,
        lineHeight: 19,
        color: colors.textSecondary,
    },

    currentBadge: {
        alignSelf: "flex-start",
        marginTop: 9,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 7,
        backgroundColor: colors.primary,
    },

    currentBadgeText: {
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 0.6,
        color: colors.surface,
    },

    novaCard: {
        marginTop: 10,
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