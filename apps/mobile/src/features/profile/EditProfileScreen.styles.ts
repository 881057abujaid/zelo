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

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingBottom: 32,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: colors.border,
    },

    backButtonText: {
        fontSize: 32,
        lineHeight: 36,
        color: colors.text,
        marginTop: -3,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
    },

    headerSpacer: {
        width: 44,
    },

    avatarSection: {
        alignItems: "center",
        paddingTop: 26,
        paddingBottom: 30,
    },

    avatar: {
        width: 100,
        height: 100,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E9E7FF",
        borderWidth: 3,
        borderColor: "#D7D2FF",
        marginBottom: 16,
    },

    avatarText: {
        fontSize: 46,
    },

    avatarTitle: {
        fontSize: 21,
        fontWeight: "700",
        color: colors.text,
    },

    avatarSubtitle: {
        fontSize: 14,
        color: "#777D8C",
        marginTop: 6,
        textAlign: "center",
    },

    form: {
        width: "100%",
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 9,
        marginTop: 20,
    },

    input: {
        minHeight: 54,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        color: colors.text,
        backgroundColor: "#FFFFFF",
    },

    usernameInputContainer: {
        minHeight: 54,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
    },

    usernamePrefix: {
        fontSize: 16,
        fontWeight: "600",
        color: "#858A99",
        marginRight: 6,
    },

    usernameInput: {
        flex: 1,
        minHeight: 52,
        fontSize: 15,
        color: colors.text,
        paddingVertical: 10,
    },

    disabledInput: {
        backgroundColor: "#F0F1F5",
        color: "#858A99",
    },

    helperText: {
        fontSize: 12,
        lineHeight: 18,
        color: "#858A99",
        marginTop: 7,
    },

    errorContainer: {
        backgroundColor: "#FEECEC",
        borderRadius: 12,
        padding: 12,
        marginTop: 22,
    },

    errorText: {
        color: "#D92D20",
        fontSize: 13,
        lineHeight: 19,
    },

    saveButton: {
        minHeight: 54,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        borderRadius: 15,
        marginTop: 28,
    },

    saveButtonPressed: {
        opacity: 0.85,
    },

    saveButtonDisabled: {
        opacity: 0.65,
    },

    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    cancelButton: {
        minHeight: 48,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },

    cancelButtonText: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "600",
    },
});