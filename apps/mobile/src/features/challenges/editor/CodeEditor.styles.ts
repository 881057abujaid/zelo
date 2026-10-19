import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0F172A",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
        overflow: "hidden",
    },

    header: {
        minHeight: 46,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1E293B",
        borderBottomWidth: 1,
        borderBottomColor: "#334155",
    },

    fileInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
    },

    fileIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#22C55E",
    },

    fileName: {
        color: "#E2E8F0",
        fontSize: 13,
        fontWeight: "600",
    },

    languageLabel: {
        color: "#94A3B8",
        fontSize: 12,
        fontWeight: "500",
    },

    editorBody: {
        flexDirection: "row",
        minHeight: 240,
        maxHeight: 420,
    },

    lineNumberContainer: {
        width: 42,
        flexGrow: 0,
        flexShrink: 0,
        backgroundColor: "#111827",
    },

    lineNumberContent: {
        paddingTop: 14,
        paddingBottom: 14,
        alignItems: "center",
    },

    lineNumber: {
        color: "#64748B",
        fontSize: 13,
        lineHeight: 22,
        fontFamily: "monospace",
    },

    codeInput: {
        flex: 1,
        minHeight: 240,
        paddingHorizontal: 12,
        paddingTop: 14,
        paddingBottom: 14,
        color: "#E2E8F0",
        fontSize: 13,
        lineHeight: 22,
        fontFamily: "monospace",
        backgroundColor: "#0F172A",
    },

    footer: {
        minHeight: 32,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1E293B",
        borderTopWidth: 1,
        borderTopColor: "#334155",
    },

    footerText: {
        color: "#94A3B8",
        fontSize: 11,
    },
});

export default styles;