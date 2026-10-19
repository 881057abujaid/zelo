import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
        backgroundColor: "#0F172A",
    },

    header: {
        minHeight: 44,
        paddingHorizontal: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        backgroundColor: "#1E293B",
        borderBottomWidth: 1,
        borderBottomColor: "#334155",
    },

    statusIndicator: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#22C55E",
    },

    title: {
        flex: 1,
        color: "#E2E8F0",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1,
    },

    badge: {
        color: "#86EFAC",
        fontSize: 10,
        fontWeight: "700",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: "#14532D",
    },

    previewArea: {
        height: 280,
        backgroundColor: "#FFFFFF",
    },

    webView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "#FFFFFF",
    },

    loadingText: {
        color: "#64748B",
        fontSize: 12,
    },
});

export default styles;