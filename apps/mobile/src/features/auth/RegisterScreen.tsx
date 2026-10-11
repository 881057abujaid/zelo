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

import { styles } from "./RegisterScreen.styles";
import { registerSchema } from "./validations/register.schema";
import {
    getRegisterErrorMessage,
    registerUser,
} from "./auth.service";

export default function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<
        Partial<Record<
            "username" | "displayName" | "email" | "password" | "confirmPassword",
            string
        >>
    >({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validateForm = () => {
        const result = registerSchema.safeParse({
            username,
            displayName,
            email,
            password,
            confirmPassword,
        });

        if (!result.success) {
            const fieldErrors: typeof errors = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (
                    typeof field === "string" &&
                    !fieldErrors[field as keyof typeof fieldErrors]
                ) {
                    fieldErrors[field as keyof typeof fieldErrors] =
                        issue.message;
                }
            });

            setErrors(fieldErrors);
            return false;
        }

        setErrors({});
        return true;
    };

    const handleRegister = async () => {
        if (isSubmitting) {
            return;
        }

        setApiError("");
        setSuccessMessage("");

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await registerUser({
                username: username.trim(),
                displayName: displayName.trim(),
                email: email.trim(),
                password,
            });

            setSuccessMessage(response.message);

            // Password fields clear kar do.
            setPassword("");
            setConfirmPassword("");

            console.log("Registered user:", response.data.user);
        } catch (error: unknown) {
            setApiError(getRegisterErrorMessage(error));
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    {/* Back navigation */}
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <Text style={styles.backText}>← Back</Text>
                    </Pressable>

                    {/* Header */}
                    <View style={styles.header}>
                        <Image
                            source={require("../../../assets/images/zelo-logo.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />

                        <Text style={styles.eyebrow}>
                            YOUR NEXT ADVENTURE STARTS HERE
                        </Text>

                        <Text style={styles.title}>
                            Create your{"\n"}
                            <Text style={styles.titleAccent}>
                                coder identity.
                            </Text>
                        </Text>

                        <Text style={styles.subtitle}>
                            Build skills, complete challenges and level up
                            your coding journey.
                        </Text>
                    </View>

                    {/* Registration form */}
                    <View style={styles.form}>
                        {/* Username */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Username *</Text>

                            <TextInput
                                value={username}
                                onChangeText={setUsername}
                                placeholder="e.g. codeexplorer"
                                placeholderTextColor="#94A3B8"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="username-new"
                                maxLength={30}
                                style={styles.input}
                            />

                            <Text style={styles.helperText}>
                                Letters, numbers and underscores only.
                            </Text>

                            {errors.username && (
                                <Text style={styles.errorText}>
                                    {errors.username}
                                </Text>
                            )}
                        </View>

                        {/* Display name */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>
                                Display name
                            </Text>

                            <TextInput
                                value={displayName}
                                onChangeText={setDisplayName}
                                placeholder="What should we call you?"
                                placeholderTextColor="#94A3B8"
                                autoCapitalize="words"
                                autoCorrect={false}
                                maxLength={50}
                                style={styles.input}
                            />

                            {errors.displayName && (
                                <Text style={styles.errorText}>
                                    {errors.displayName}
                                </Text>
                            )}
                        </View>

                        {/* Email */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Email address *</Text>

                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="you@example.com"
                                placeholderTextColor="#94A3B8"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete="email"
                                textContentType="emailAddress"
                                style={styles.input}
                            />

                            {errors.email && (
                                <Text style={styles.errorText}>
                                    {errors.email}
                                </Text>
                            )}
                        </View>

                        {/* Password */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>Password *</Text>

                            <View style={styles.passwordContainer}>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Create a password"
                                    placeholderTextColor="#94A3B8"
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="new-password"
                                    textContentType="newPassword"
                                    maxLength={128}
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

                            <Text style={styles.helperText}>
                                Use at least 8 characters.
                            </Text>

                            {errors.password && (
                                <Text style={styles.errorText}>
                                    {errors.password}
                                </Text>
                            )}
                        </View>

                        {/* Confirm password */}
                        <View style={styles.fieldGroup}>
                            <Text style={styles.label}>
                                Confirm password *
                            </Text>

                            <View style={styles.passwordContainer}>
                                <TextInput
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    placeholder="Enter your password again"
                                    placeholderTextColor="#94A3B8"
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="off"
                                    maxLength={128}
                                    style={styles.passwordInput}
                                />

                                <Pressable
                                    onPress={() =>
                                        setShowConfirmPassword(
                                            (previous) => !previous
                                        )
                                    }
                                    hitSlop={10}
                                >
                                    <Text style={styles.showPasswordText}>
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </Text>
                                </Pressable>
                            </View>

                            {errors.confirmPassword && (
                                <Text style={styles.errorText}>
                                    {errors.confirmPassword}
                                </Text>
                            )}
                        </View>

                        {apiError ? (
                            <Text
                                style={styles.errorText}
                                accessibilityRole="alert"
                            >
                                {apiError}
                            </Text>
                        ) : null}

                        {successMessage ? (
                            <Text
                                style={{
                                    color: "#16A34A",
                                    fontSize: 14,
                                    marginBottom: 12,
                                }}
                                accessibilityRole="alert"
                            >
                                {successMessage}
                            </Text>
                        ) : null}

                        {/* Create account */}
                        <Pressable
                            onPress={handleRegister}
                            disabled={isSubmitting}
                            style={({ pressed }) => [
                                styles.primaryButton,
                                pressed && !isSubmitting && styles.primaryButtonPressed,
                                isSubmitting && { opacity: 0.7 },
                            ]}
                        >
                            <Text style={styles.primaryButtonText}>
                                {isSubmitting
                                    ? "Creating account..."
                                    : "Create My Account →"}
                            </Text>
                        </Pressable>

                        <Text style={styles.disclaimer}>
                            By creating an account, you agree to use ZELO
                            responsibly and respectfully.
                        </Text>

                        {/* Login navigation */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Already have an account?
                            </Text>

                            <Pressable
                                onPress={() => router.replace("/login")}
                                hitSlop={8}
                            >
                                <Text style={styles.footerLink}>
                                    Log in
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