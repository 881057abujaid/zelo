import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { styles } from "./LoginScreen.styles";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backText}>← Back</Text>
                    </Pressable>

                    <View style={styles.header}>
                        <Image
                            source={require("../../../assets/images/zelo-logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.eyebrow}>
                            WELCOME BACK, CODER
                        </Text>

                        <Text style={styles.title}>
                            Continue your{"\n"}
                            <Text style={styles.titleAccent}>
                                coding journey.
                            </Text>
                        </Text>

                        <Text style={styles.subtitle}>
                            Your next level is waiting for you.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Email address</Text>

                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="you@example.com"
                                placeholderTextColor={colors.textMuted}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="email"
                                textContentType="emailAddress"
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Password</Text>

                            <View style={styles.passwordContainer}>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Enter your password"
                                    placeholderTextColor={colors.textMuted}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="current-password"
                                    textContentType="password"
                                    style={styles.passwordInput}
                                />

                                <Pressable
                                    onPress={() =>
                                        setShowPassword((previous) => !previous)
                                    }
                                    hitSlop={10}
                                >
                                    <Text style={styles.showPasswordText}>
                                        {showPassword ? "Hide" : "Show"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>

                        <Pressable
                            onPress={() => {
                                // Forgot-password flow will be implemented later.
                            }}
                            style={styles.forgotButton}
                        >
                            <Text style={styles.forgotText}>
                                Forgot password?
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                // Login API integration comes next.
                            }}
                            style={({ pressed }) => [
                                styles.primaryButton,
                                pressed && styles.primaryButtonPressed,
                            ]}
                        >
                            <Text style={styles.primaryButtonText}>
                                Log In to ZELO →
                            </Text>
                        </Pressable>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                New to ZELO?
                            </Text>

                            <Pressable
                                onPress={() => router.push("/register")}
                            >
                                <Text style={styles.footerLink}>
                                    Create account
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    <Text style={styles.bottomNote}>
                        LEARN • BUILD • LEVEL UP
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}