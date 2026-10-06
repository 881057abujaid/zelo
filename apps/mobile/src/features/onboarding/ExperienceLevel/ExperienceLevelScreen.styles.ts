import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

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
        marginTop: 44,
        alignItems: "center",
    },

    title: {
        textAlign: "center",
        fontSize: 32,
        lineHeight: 40,
        fontWeight: "800",
        color: colors.text,
        letterSpacing: -0.5,
    },

    subtitle: {
        marginTop: 14,
        textAlign: "center",
        fontSize: 15,
        lineHeight: 22,
        color: colors.textSecondary,
    },

    levels: {
        flex: 1,
        justifyContent: "center",
        gap: 12,
        marginTop: 24,
    },

    levelCard: {
        minHeight: 76,
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 16,
        backgroundColor: colors.surface,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
    },

    levelCardSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primaryLight,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        fontSize: 24,
    },

    levelInfo: {
        flex: 1,
        marginLeft: 14,
    },

    levelTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.text,
    },

    levelDescription: {
        marginTop: 3,
        fontSize: 13,
        color: colors.textSecondary,
    },

    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: "#CBD5E1",
        alignItems: "center",
        justifyContent: "center",
    },

    radioSelected: {
        borderColor: colors.primary,
    },

    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
    },

    actions: {
        marginTop: 20,
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

    primaryButtonDisabled: {
        backgroundColor: "#CBD5E1",
    },

    primaryButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.surface,
    },

    arrow: {
        marginLeft: 10,
        fontSize: 22,
        fontWeight: "500",
        color: colors.surface,
    },
});