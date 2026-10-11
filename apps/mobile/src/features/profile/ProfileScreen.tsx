import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useAuthStore } from "@/features/auth/auth.store";
import { useProgressStore } from "@/features/progress/progressStore";

import { styles } from "./ProfileScreen.styles";

export default function ProfileScreen() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const progress = useProgressStore();

    const playerLevel = Math.floor(progress.xp / 500) + 1;

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await logout();
                            router.replace("/");
                        } catch {
                            Alert.alert(
                                "Logout Failed",
                                "Unable to logout. Please try again.",
                            );
                        }
                    },
                },
            ],
        );
    };

    const menuItems = [
        {
            icon: "👤",
            title: "Account Information",
            subtitle: "Your personal details",
            onPress: () => {
                Alert.alert(
                    "Coming Soon",
                    "Account Information will be available soon.",
                );
            },
        },
        {
            icon: "⚙️",
            title: "App Settings",
            subtitle: "Customize your experience",
            onPress: () => {
                Alert.alert(
                    "Coming Soon",
                    "App Settings will be available soon.",
                );
            },
        },
        {
            icon: "❓",
            title: "Help & Support",
            subtitle: "Get help with ZELO",
            onPress: () => {
                Alert.alert(
                    "Help & Support",
                    "Support features will be available soon.",
                );
            },
        },
        {
            icon: "ℹ️",
            title: "About ZELO",
            subtitle: "Your coding adventure",
            onPress: () => {
                Alert.alert(
                    "About ZELO",
                    "Learn to code. Complete challenges. Level up! 🚀",
                );
            },
        },
    ];

    return (
        <SafeAreaView
            style={styles.container}
            edges={["top", "bottom"]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backButtonText}>‹</Text>
                    </Pressable>

                    <Text style={styles.headerTitle}>My Profile</Text>

                    <View style={styles.headerSpacer} />
                </View>

                {/* User Information */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>👨‍💻</Text>
                    </View>

                    <Text style={styles.userName}>
                        {user?.displayName ||
                            user?.username ||
                            "ZELO User"}
                    </Text>

                    <Text style={styles.userEmail}>
                        {user?.email ?? ""}
                    </Text>

                    <Pressable
                        accessibilityRole="button"
                        onPress={() => router.push("/edit-profile")}
                        style={styles.editProfileButton}
                    >
                        <Text style={styles.editProfileButtonText}>
                            ✏️ Edit Profile
                        </Text>
                    </Pressable>

                    <View style={styles.memberBadge}>
                        <Text style={styles.memberBadgeText}>
                            🚀 CODE EXPLORER
                        </Text>
                    </View>
                </View>

                {/* Learning Statistics */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Your Learning Stats
                    </Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>⚡</Text>
                            <Text style={styles.statValue}>
                                {progress.xp}
                            </Text>
                            <Text style={styles.statLabel}>
                                Total XP
                            </Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>🏆</Text>
                            <Text style={styles.statValue}>
                                {playerLevel}
                            </Text>
                            <Text style={styles.statLabel}>
                                Level
                            </Text>
                        </View>

                        <View style={styles.statCard}>
                            <Text style={styles.statIcon}>❤️</Text>
                            <Text style={styles.statValue}>
                                {progress.lives}
                            </Text>
                            <Text style={styles.statLabel}>
                                Lives
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Account Menu */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Account & Settings
                    </Text>

                    <View style={styles.menuCard}>
                        {menuItems.map((item, index) => (
                            <Pressable
                                key={item.title}
                                accessibilityRole="button"
                                onPress={item.onPress}
                                style={[
                                    styles.menuItem,
                                    index !== menuItems.length - 1 &&
                                    styles.menuItemBorder,
                                ]}
                            >
                                <View style={styles.menuIcon}>
                                    <Text style={styles.menuIconText}>
                                        {item.icon}
                                    </Text>
                                </View>

                                <View style={styles.menuContent}>
                                    <Text style={styles.menuTitle}>
                                        {item.title}
                                    </Text>

                                    <Text style={styles.menuSubtitle}>
                                        {item.subtitle}
                                    </Text>
                                </View>

                                <Text style={styles.menuArrow}>›</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Logout */}
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Logout"
                    onPress={handleLogout}
                    style={({ pressed }) => [
                        styles.logoutButton,
                        pressed && styles.logoutButtonPressed,
                    ]}
                >
                    <Text style={styles.logoutIcon}>⇥</Text>

                    <Text style={styles.logoutButtonText}>
                        Logout
                    </Text>
                </Pressable>

                <Text style={styles.footerText}>
                    Made with ❤️ for developers
                </Text>

                <Text style={styles.versionText}>
                    ZELO • Version 1.0.0
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}