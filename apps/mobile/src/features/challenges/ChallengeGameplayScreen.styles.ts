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
        paddingBottom: 32,
    },

    backButton: {
        alignSelf: "flex-start",
        paddingVertical: 12,
        marginBottom: 24,
    },

    backButtonText: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: "700",
    },

    header: {
        marginBottom: 28,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.5,
        marginBottom: 14,
    },

    title: {
        color: colors.text,
        fontSize: 32,
        lineHeight: 39,
        fontWeight: "800",
        letterSpacing: -0.7,
        marginBottom: 10,
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 15,
        lineHeight: 23,
    },

    editorPlaceholder: {
        overflow: "hidden",
        borderRadius: 18,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 20,
    },

    editorHeader: {
        minHeight: 54,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    editorIndicator: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: colors.primary,
        marginRight: 10,
    },

    editorLabel: {
        flex: 1,
        color: colors.text,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1,
    },

    editorLanguage: {
        color: colors.textSecondary,
        fontSize: 11,
        fontWeight: "700",
    },

    editorBody: {
        minHeight: 230,
        padding: 22,
        alignItems: "center",
        justifyContent: "center",
    },

    editorIcon: {
        color: colors.primary,
        fontSize: 38,
        fontWeight: "800",
        marginBottom: 14,
    },

    editorTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 10,
    },

    editorDescription: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 21,
        textAlign: "center",
        marginBottom: 6,
    },

    infoCard: {
        padding: 18,
        borderRadius: 16,
        backgroundColor: colors.primary + "0D",
        borderWidth: 1,
        borderColor: colors.primary + "30",
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

    section: {
        marginTop: 24,
    },

    sectionHeading: {
        color: colors.text,
        fontSize: 12,
        fontWeight: "800",
        letterSpacing: 1.2,
        marginBottom: 12,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    secondaryButton: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },

    secondaryButtonText: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "700",
    },

    noticeCard: {
        marginTop: 20,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },

    noticeTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "800",
        marginBottom: 8,
    },

    noticeDescription: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 21,
    },

    submitButton: {
        minHeight: 52,
        paddingHorizontal: 18,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        backgroundColor: colors.primary,
    },

    submitButtonDisabled: {
        opacity: 0.5,
    },

    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "800",
    },

    errorCard: {
        marginTop: 12,
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#DC2626",
        backgroundColor: "#450A0A",
    },

    errorText: {
        color: "#FCA5A5",
        fontSize: 13,
        lineHeight: 20,
    },

    infoMeta: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "700",
        marginTop: 8,
        marginBottom: 4,
    },

    editorTabs: {
        flexDirection: "row",
        gap: 8,
        marginBottom: 12,
    },

    editorTab: {
        minWidth: 80,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },

    editorTabActive: {
        backgroundColor: colors.primary + "18",
        borderColor: colors.primary,
    },

    editorTabText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "700",
    },

    editorTabTextActive: {
        color: colors.primary,
    },
});