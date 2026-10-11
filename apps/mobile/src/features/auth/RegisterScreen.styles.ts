import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    keyboardContainer: {
        flex: 1,
    },

    content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 28,
    },

    backButton: {
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingRight: 16,
    },

    backText: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.textSecondary,
    },

    header: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 28,
    },

    // Original ZELO logo
    logo: {
        width: 150,
        height: 90,
        alignSelf: "center",
        marginBottom: 20,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 10,
        textAlign: "center",
        fontWeight: "800",
        letterSpacing: 1.5,
        marginBottom: 10,
    },

    title: {
        color: colors.text,
        fontSize: 32,
        lineHeight: 40,
        textAlign: "center",
        fontWeight: "800",
        letterSpacing: -0.8,
    },

    titleAccent: {
        color: colors.primary,
        textAlign: "center",
    },

    subtitle: {
        marginTop: 12,
        fontSize: 14,
        lineHeight: 22,
        textAlign: "center",
        color: colors.textSecondary,
        maxWidth: 320,
    },

    form: {
        gap: 20,
    },

    fieldGroup: {
        gap: 8,
    },

    label: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
    },

    input: {
        height: 54,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 15,
        backgroundColor: colors.surface,
        color: colors.text,
        fontSize: 14,
    },

    passwordContainer: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingLeft: 15,
        paddingRight: 14,
        backgroundColor: colors.surface,
    },

    passwordInput: {
        flex: 1,
        height: "100%",
        color: colors.text,
        fontSize: 14,
    },

    showPasswordText: {
        paddingLeft: 12,
        fontSize: 13,
        fontWeight: "700",
        color: colors.primary,
    },

    helperText: {
        fontSize: 12,
        lineHeight: 17,
        color: colors.textMuted,
    },

    primaryButton: {
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        backgroundColor: colors.primary,
        marginTop: 4,
    },

    primaryButtonPressed: {
        backgroundColor: colors.primaryDark,
        transform: [{ scale: 0.98 }],
    },

    primaryButtonText: {
        color: colors.surface,
        fontSize: 15,
        fontWeight: "800",
    },

    disclaimer: {
        textAlign: "center",
        fontSize: 11,
        lineHeight: 17,
        color: colors.textMuted,
        paddingHorizontal: 8,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 6,
        marginTop: 4,
    },

    footerText: {
        color: colors.textSecondary,
        fontSize: 13,
    },

    footerLink: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "800",
    },

    bottomNote: {
        marginTop: 28,
        textAlign: "center",
        color: colors.textMuted,
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 2,
    },

    errorText: {
        color: "#EF4444",
        fontSize: 12,
        lineHeight: 17,
        marginTop: 4,
    },
});