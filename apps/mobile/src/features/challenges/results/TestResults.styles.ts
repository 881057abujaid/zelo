import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        gap: 14,
    },

    emptyContainer: {
        padding: 20,
        alignItems: "center",
        gap: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#334155",
        backgroundColor: "#1E293B",
    },

    emptyTitle: {
        color: "#F1F5F9",
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
    },

    emptyDescription: {
        color: "#94A3B8",
        fontSize: 12,
        lineHeight: 18,
        textAlign: "center",
    },

    loadingText: {
        padding: 20,
        color: "#94A3B8",
        fontSize: 13,
        textAlign: "center",
    },

    resultBanner: {
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderRadius: 12,
        borderWidth: 1,
    },

    successBanner: {
        backgroundColor: "#052E16",
        borderColor: "#166534",
    },

    failureBanner: {
        backgroundColor: "#450A0A",
        borderColor: "#991B1B",
    },

    resultIcon: {
        width: 38,
        height: 38,
        borderRadius: 19,
        overflow: "hidden",
        backgroundColor: "#1E293B",
        color: "#F8FAFC",
        fontSize: 23,
        fontWeight: "700",
        textAlign: "center",
        textAlignVertical: "center",
        lineHeight: 38,
    },

    resultTextContainer: {
        flex: 1,
        gap: 4,
    },

    resultTitle: {
        color: "#F8FAFC",
        fontSize: 15,
        fontWeight: "700",
    },

    resultDescription: {
        color: "#CBD5E1",
        fontSize: 12,
    },

    xpCard: {
        padding: 16,
        gap: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#854D0E",
        backgroundColor: "#422006",
    },

    xpLabel: {
        color: "#FDE68A",
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 1.2,
    },

    xpValue: {
        color: "#FACC15",
        fontSize: 25,
        fontWeight: "800",
    },

    xpDescription: {
        color: "#FDE68A",
        fontSize: 12,
        lineHeight: 18,
    },

    sectionTitle: {
        color: "#CBD5E1",
        fontSize: 11,
        fontWeight: "700",
        letterSpacing: 1.2,
    },

    checksList: {
        maxHeight: 320,
    },

    checkCard: {
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#334155",
        backgroundColor: "#1E293B",
    },

    checkIcon: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
    },

    passedIcon: {
        backgroundColor: "#14532D",
    },

    failedIcon: {
        backgroundColor: "#7F1D1D",
    },

    checkIconText: {
        color: "#F8FAFC",
        fontSize: 15,
        fontWeight: "700",
    },

    checkContent: {
        flex: 1,
        gap: 4,
    },

    checkTitle: {
        color: "#F1F5F9",
        fontSize: 12,
        fontWeight: "600",
    },

    checkMessage: {
        color: "#94A3B8",
        fontSize: 11,
        lineHeight: 16,
    },

    checkStatus: {
        fontSize: 10,
        fontWeight: "800",
    },

    passedText: {
        color: "#4ADE80",
    },

    failedText: {
        color: "#F87171",
    },

    achievementSection: {
        gap: 10,
    },

    achievementCard: {
        padding: 14,
        gap: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#854D0E",
        backgroundColor: "#292015",
    },

    achievementTitle: {
        color: "#FDE68A",
        fontSize: 13,
        fontWeight: "700",
    },

    achievementSlug: {
        color: "#D6D3D1",
        fontSize: 11,
    },
});

export default styles;