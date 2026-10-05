import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { styles } from "./NovaIntroScreen.styles";

export default function NovaIntroScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.container}>
                    {/* Progress */}
                    <View style={styles.progress}>
                        <View style={styles.activeDot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>

                    {/* Nova */}
                    <View style={styles.characterContainer}>
                        <Image
                            source={require("../../../../assets/images/nova-hi.png")}
                            style={styles.character}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Introduction */}
                    <View style={styles.textContainer}>
                        <Text style={styles.greeting}>
                            Hey! I'm Nova 👋
                        </Text>

                        <Text style={styles.subtitle}>
                            Your AI Coding Coach
                        </Text>

                        <Text style={styles.description}>
                            I'll guide you through your coding journey,
                            help you learn from mistakes, and celebrate
                            every level you reach.
                        </Text>
                    </View>

                    {/* CTA */}
                    <View style={styles.actions}>
                        <Pressable
                            onPress={() => router.push("/onboarding/goal")}
                            style={({ pressed }) => [
                                styles.primaryButton,
                                pressed && styles.primaryButtonPressed,
                            ]}
                        >
                            <Text style={styles.primaryButtonText}>
                                Meet Nova
                            </Text>

                            <Text style={styles.arrow}>
                                →
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}