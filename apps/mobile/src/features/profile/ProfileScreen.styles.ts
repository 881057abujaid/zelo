import { StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 32,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
    },

    backButton: {
        width: 42,
        height: 42,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
    },

    backButtonText: {
        fontSize: 32,
        lineHeight: 36,
        color: colors.text,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
    },

    headerSpacer: {
        width: 42,
    },

    profileCard: {
        alignItems: "center",
        paddingVertical: 28,
        paddingHorizontal: 20,
        borderRadius: 24,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
        marginTop: 8,
    },

    avatar: {
        width: 104,
        height: 104,
        borderRadius: 52,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        marginBottom: 16,
    },

    avatarText: {
        fontSize: 52,
    },

    userName: {
        fontSize: 23,
        fontWeight: "800",
        color: colors.text,
        textAlign: "center",
    },

    userEmail: {
        fontSize: 14,
        color: colors.text,
        opacity: 0.7,
        marginTop: 6,
        textAlign: "center",
    },

    editProfileButton: {
        marginTop: 16,
        paddingHorizontal: 20,
        paddingVertical: 11,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: "#FFFFFF",
    },

    editProfileButtonText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "700",
    },

    memberBadge: {
        marginTop: 16,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.primary,
    },

    memberBadgeText: {
        fontSize: 11,
        fontWeight: "800",
        color: colors.background,
        letterSpacing: 1,
    },

    section: {
        marginTop: 28,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 14,
    },

    statsContainer: {
        flexDirection: "row",
        gap: 12,
    },

    statCard: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        paddingHorizontal: 6,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.background,
    },

    statIcon: {
        fontSize: 25,
        marginBottom: 10,
    },

    statValue: {
        fontSize: 23,
        fontWeight: "800",
        color: colors.text,
    },

    statLabel: {
        fontSize: 12,
        color: colors.text,
        opacity: 0.7,
        marginTop: 5,
    },

    menuCard: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
        backgroundColor: colors.background,
    },

    menuItem: {
        minHeight: 82,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 14,
    },

    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    menuIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },

    menuIconText: {
        fontSize: 21,
    },

    menuContent: {
        flex: 1,
    },

    menuTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.text,
    },

    menuSubtitle: {
        fontSize: 12,
        color: colors.text,
        opacity: 0.65,
        marginTop: 5,
    },

    menuArrow: {
        fontSize: 28,
        color: colors.text,
        opacity: 0.6,
    },

    logoutButton: {
        minHeight: 56,
        marginTop: 28,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        borderRadius: 16,
        backgroundColor: "#FEECEC",
        borderWidth: 1,
        borderColor: "#F5CACA",
    },

    logoutButtonPressed: {
        opacity: 0.7,
    },

    logoutIcon: {
        fontSize: 24,
        color: "#D92D20",
    },

    logoutButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#D92D20",
    },

    footerText: {
        marginTop: 28,
        fontSize: 13,
        color: colors.text,
        opacity: 0.7,
        textAlign: "center",
    },

    versionText: {
        marginTop: 8,
        fontSize: 11,
        color: colors.text,
        opacity: 0.5,
        textAlign: "center",
    },
});