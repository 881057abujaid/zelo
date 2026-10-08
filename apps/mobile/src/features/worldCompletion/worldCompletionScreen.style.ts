import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 24,
        justifyContent: "center",
    },

    card: {
        padding: 28,
        alignItems: "center",
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 24,
    },

    trophy: {
        fontSize: 64,
        marginBottom: 16,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.text,
        textAlign: "center",
    },

    subtitle: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "600",
        color: colors.textSecondary,
        textAlign: "center",
    },

    divider: {
        width: "100%",
        height: 1,
        marginVertical: 24,
        backgroundColor: colors.border,
    },

    stats: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },

    stat: {
        width: "50%",
        alignItems: "center",
    },

    statValue: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.text,
    },

    statLabel: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "600",
        color: colors.textSecondary,
        textAlign: "center",
    },

    statDivider: {
        position: "absolute",
        left: "50%",
        top: 0,
        width: 1,
        height: 36,
        backgroundColor: colors.border,
    },

    message: {
        marginTop: 24,
        fontSize: 14,
        lineHeight: 21,
        color: colors.textSecondary,
        textAlign: "center",
    },

    continueButton: {
        minHeight: 54,
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: colors.primary,
        borderRadius: 14,
    },

    continueButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    arrow: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "700",
        color: "#FFFFFF",
    },
});