import { View, Text, StyleSheet } from "react-native";

import { colors } from "@/constants/colors";

export default function ExploreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore 🌎</Text>
            <Text style={styles.subtitle}>
                Discover coding worlds and learning paths.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.primary,
    },
    subtitle: {
        marginTop: 8,
        fontSize: 15,
        textAlign: "center",
        color: "#777777",
    },
});