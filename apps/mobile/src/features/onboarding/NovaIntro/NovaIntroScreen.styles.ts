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

    progress: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        paddingTop: 4,
    },

    activeDot: {
        width: 24,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },

    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#D1D5DB",
    },

    characterContainer: {
        flex: 1,
        minHeight: 0,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },

    character: {
        height: "100%",
        width: "100%",
        maxWidth: 360,
        maxHeight: 500,
    },

    textContainer: {
        alignItems: "center",
        paddingHorizontal: 8,
    },

    greeting: {
        textAlign: "center",
        fontSize: 30,
        lineHeight: 38,
        fontWeight: "800",
        color: colors.text,
    },

    subtitle: {
        marginTop: 6,
        fontSize: 17,
        fontWeight: "700",
        color: colors.primary,
    },

    description: {
        marginTop: 12,
        maxWidth: 340,
        textAlign: "center",
        fontSize: 15,
        lineHeight: 23,
        color: colors.textSecondary,
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

    primaryButtonPressed: {
        backgroundColor: colors.primaryDark,
        transform: [{ scale: 0.98 }],
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