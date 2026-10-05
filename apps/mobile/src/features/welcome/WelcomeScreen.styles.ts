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
        paddingVertical: 24,
        justifyContent: "space-between",
    },

    brand: {
        alignItems: "center",
        paddingTop: 16,
    },

    logo: {
        width: 190,
        height: 95,
    },

    hero: {
        alignItems: "center",
        paddingHorizontal: 8,
    },

    title: {
        textAlign: "center",
        fontSize: 38,
        lineHeight: 46,
        fontWeight: "800",
        color: colors.text,
        letterSpacing: -1,
    },

    titleAccent: {
        color: colors.primary,
    },

    description: {
        marginTop: 18,
        maxWidth: 330,
        textAlign: "center",
        fontSize: 16,
        lineHeight: 24,
        color: colors.textSecondary,
    },

    actions: {
        gap: 12,
        paddingBottom: 12,
    },

    primaryButton: {
        height: 56,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },

    primaryButtonPressed: {
        backgroundColor: colors.primaryDark,
        transform: [{ scale: 0.98 }],
    },

    primaryButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.surface,
    },

    loginButton: {
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    loginButtonPressed: {
        backgroundColor: colors.primaryLight,
    },

    loginText: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.primary,
    },
});