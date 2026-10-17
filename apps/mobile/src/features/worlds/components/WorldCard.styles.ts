import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        borderRadius: 28,
        overflow: "hidden",
        minHeight: 390,
        backgroundColor: "#25334D",
    },

    cardPressed: {
        opacity: 0.92,
        transform: [{ scale: 0.99 }],
    },

    backgroundImage: {
        minHeight: 390,
        justifyContent: "space-between",
    },

    image: {
        borderRadius: 28,
    },

    overlay: {
        flex: 1,
        minHeight: 390,
        padding: 20,
        justifyContent: "space-between",
        backgroundColor: "rgba(10, 18, 38, 0.30)",
    },

    fallbackBackground: {
        flex: 1,
        minHeight: 390,
        backgroundColor: "#334155",
    },

    topContent: {
        gap: 16,
        alignItems: "flex-start",
    },

    worldBadge: {
        overflow: "hidden",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 18,
        backgroundColor: "rgba(255, 255, 255, 0.90)",
        color: "#166534",
        fontSize: 11,
        fontWeight: "900",
        letterSpacing: 0.6,
    },

    information: {
        width: "100%",
        gap: 10,
    },

    title: {
        fontSize: 28,
        lineHeight: 34,
        fontWeight: "900",
        color: "#FFFFFF",
        textShadowColor: "rgba(0, 0, 0, 0.45)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },

    description: {
        fontSize: 14,
        lineHeight: 21,
        color: "#FFFFFF",
        textShadowColor: "rgba(0, 0, 0, 0.65)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },

    bottomPanel: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: 14,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.94)",
    },

    progressTextGroup: {
        flex: 1,
        gap: 5,
    },

    progressTitle: {
        fontSize: 15,
        fontWeight: "900",
        color: "#101828",
    },

    progressSubtitle: {
        fontSize: 12,
        lineHeight: 17,
        color: "#475569",
    },

    arrowButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#16A34A",
    },

    arrowText: {
        marginTop: -4,
        fontSize: 36,
        lineHeight: 42,
        fontWeight: "500",
        color: "#FFFFFF",
    },
});