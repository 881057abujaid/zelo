import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 32,
        gap: 20,
        backgroundColor: colors.background,
    },

    header: {
        gap: 10,
        paddingTop: 8,
        paddingBottom: 8,
    },

    eyebrow: {
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 1.5,
        color: colors.primary,
    },

    title: {
        fontSize: 32,
        lineHeight: 39,
        fontWeight: "900",
        color: colors.text,
    },

    subtitle: {
        maxWidth: 340,
        fontSize: 15,
        lineHeight: 23,
        color: colors.textSecondary,
    },

    worldCount: {
        alignSelf: "flex-start",
        marginTop: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        overflow: "hidden",
        backgroundColor: colors.primaryLight,
        color: colors.primaryDark,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0.5,
    },

    stateContainer: {
        flexGrow: 1,
        minHeight: 280,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        gap: 12,
    },

    stateEmoji: {
        fontSize: 48,
        marginBottom: 4,
    },

    stateTitle: {
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
        color: colors.text,
    },

    stateDescription: {
        maxWidth: 300,
        fontSize: 14,
        lineHeight: 21,
        textAlign: "center",
        color: colors.textSecondary,
    },

    retryButton: {
        marginTop: 8,
        paddingHorizontal: 24,
        paddingVertical: 13,
        borderRadius: 14,
        backgroundColor: colors.primary,
    },

    retryButtonText: {
        fontSize: 14,
        fontWeight: "800",
        color: colors.surface,
    },
});