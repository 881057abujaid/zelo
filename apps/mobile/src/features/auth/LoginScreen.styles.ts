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
        paddingBottom: 24,
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
        marginTop: 28,
        marginBottom: 32,
    },

    // Original ZELO logo
    logo: {
        width: 150,
        height: 90,
        alignSelf: "center",
        marginBottom: 16,
    },

    eyebrow: {
        color: colors.primary,
        fontSize: 11,
        textAlign: "center",
        fontWeight: "800",
        letterSpacing: 2,
        marginBottom: 12,
    },

    title: {
        color: colors.text,
        fontSize: 34,
        textAlign: "center",
        lineHeight: 42,
        fontWeight: "800",
        letterSpacing: -1,
    },

    titleAccent: {
        color: colors.primary,
        textAlign: "center",
    },

    subtitle: {
        marginTop: 12,
        fontSize: 15,
        textAlign: "center",
        lineHeight: 23,
        color: colors.textSecondary,
    },

    form: {
        gap: 22,
    },

    fieldGroup: {
        gap: 9,
    },

    label: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
    },

    input: {
        height: 56,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        backgroundColor: colors.surface,
        color: colors.text,
        fontSize: 15,
    },

    passwordContainer: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingLeft: 16,
        paddingRight: 14,
        backgroundColor: colors.surface,
    },

    passwordInput: {
        flex: 1,
        height: "100%",
        color: colors.text,
        fontSize: 15,
    },

    showPasswordText: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.primary,
        paddingLeft: 12,
    },

    forgotButton: {
        alignSelf: "flex-end",
        marginTop: -8,
    },

    forgotText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "700",
    },

    primaryButton: {
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        backgroundColor: colors.primary,
        marginTop: 2,
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

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 8,
    },

    footerText: {
        color: colors.textSecondary,
        fontSize: 14,
    },

    footerLink: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "800",
    },

    bottomNote: {
        marginTop: 32,
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