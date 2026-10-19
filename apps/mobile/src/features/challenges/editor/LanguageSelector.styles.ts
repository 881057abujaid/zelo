import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },

    title: {
        color: "#94A3B8",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.2,
    },

    languageList: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingRight: 4,
    },

    languageButton: {
        minHeight: 38,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#334155",
        backgroundColor: "#1E293B",
    },

    selectedLanguageButton: {
        backgroundColor: "#14532D",
        borderColor: "#16A34A",
    },

    languageText: {
        color: "#CBD5E1",
        fontSize: 12,
        fontWeight: "600",
    },

    selectedLanguageText: {
        color: "#86EFAC",
    },

    runIndicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#22C55E",
    },

    helperText: {
        color: "#64748B",
        fontSize: 11,
        lineHeight: 16,
    },
});

export default styles;