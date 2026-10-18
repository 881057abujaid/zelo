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
});