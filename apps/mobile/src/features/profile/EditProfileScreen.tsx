import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { useAuthStore } from "@/features/auth/auth.store";
import { getProfileErrorMessage } from "./profile.service";

import { styles } from "./EditProfileScreen.styles";

export default function EditProfileScreen() {
    const router = useRouter();

    const user = useAuthStore((state) => state.user);
    const updateProfile = useAuthStore(
        (state) => state.updateProfile,
    );

    const [displayName, setDisplayName] = useState(
        user?.displayName ?? "",
    );
    const [username, setUsername] = useState(
        user?.username ?? "",
    );

    const [errorMessage, setErrorMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setDisplayName(user?.displayName ?? "");
        setUsername(user?.username ?? "");
    }, [user?.displayName, user?.username]);

    const handleSave = async () => {
        setErrorMessage("");

        const normalizedUsername = username.trim().toLowerCase();
        const normalizedDisplayName = displayName.trim();

        if (normalizedUsername.length < 3) {
            setErrorMessage(
                "Username must contain at least 3 characters.",
            );
            return;
        }

        if (normalizedUsername.length > 30) {
            setErrorMessage(
                "Username cannot exceed 30 characters.",
            );
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
            setErrorMessage(
                "Username can contain only letters, numbers, and underscores.",
            );
            return;
        }

        if (
            normalizedDisplayName.length < 2 ||
            normalizedDisplayName.length > 50
        ) {
            setErrorMessage(
                "Display name must contain 2–50 characters.",
            );
            return;
        }

        const payload: {
            username?: string;
            displayName?: string;
        } = {};

        if (normalizedUsername !== user?.username) {
            payload.username = normalizedUsername;
        }

        if (normalizedDisplayName !== (user?.displayName ?? "")) {
            payload.displayName = normalizedDisplayName;
        }

        if (Object.keys(payload).length === 0) {
            router.back();
            return;
        }

        try {
            setIsSaving(true);

            await updateProfile(payload);

            router.back();
        } catch (error) {
            setErrorMessage(getProfileErrorMessage(error));
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <SafeAreaView
            style={styles.container}
            edges={["top", "bottom"]}
        >
            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.header}>
                        <Pressable
                            accessibilityRole="button"
                            accessibilityLabel="Go back"
                            onPress={() => router.back()}
                            style={styles.backButton}
                            disabled={isSaving}
                        >
                            <Text style={styles.backButtonText}>‹</Text>
                        </Pressable>

                        <Text style={styles.headerTitle}>
                            Edit Profile
                        </Text>

                        <View style={styles.headerSpacer} />
                    </View>

                    <View style={styles.avatarSection}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                👨‍💻
                            </Text>
                        </View>

                        <Text style={styles.avatarTitle}>
                            Your ZELO Profile
                        </Text>

                        <Text style={styles.avatarSubtitle}>
                            Update your personal information
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Text style={styles.label}>
                            Display Name
                        </Text>

                        <TextInput
                            accessibilityLabel="Display name"
                            value={displayName}
                            onChangeText={setDisplayName}
                            placeholder="Enter your display name"
                            placeholderTextColor="#9297A5"
                            style={styles.input}
                            autoCapitalize="words"
                            maxLength={50}
                            editable={!isSaving}
                        />

                        <Text style={styles.label}>
                            Username
                        </Text>

                        <View style={styles.usernameInputContainer}>
                            <Text style={styles.usernamePrefix}>@</Text>

                            <TextInput
                                accessibilityLabel="Username"
                                value={username}
                                onChangeText={setUsername}
                                placeholder="your_username"
                                placeholderTextColor="#9297A5"
                                style={styles.usernameInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                maxLength={30}
                                editable={!isSaving}
                            />
                        </View>

                        <Text style={styles.helperText}>
                            Use 3–30 letters, numbers, or underscores.
                        </Text>

                        <Text style={styles.label}>
                            Email Address
                        </Text>

                        <TextInput
                            accessibilityLabel="Email address"
                            value={user?.email ?? ""}
                            style={[
                                styles.input,
                                styles.disabledInput,
                            ]}
                            editable={false}
                        />

                        <Text style={styles.helperText}>
                            Email changes require a separate verification flow.
                        </Text>

                        {errorMessage ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>
                                    {errorMessage}
                                </Text>
                            </View>
                        ) : null}

                        <Pressable
                            accessibilityRole="button"
                            onPress={handleSave}
                            disabled={isSaving}
                            style={({ pressed }) => [
                                styles.saveButton,
                                pressed && !isSaving &&
                                styles.saveButtonPressed,
                                isSaving && styles.saveButtonDisabled,
                            ]}
                        >
                            {isSaving ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.saveButtonText}>
                                    Save Changes
                                </Text>
                            )}
                        </Pressable>

                        <Pressable
                            accessibilityRole="button"
                            onPress={() => router.back()}
                            disabled={isSaving}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelButtonText}>
                                Cancel
                            </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}