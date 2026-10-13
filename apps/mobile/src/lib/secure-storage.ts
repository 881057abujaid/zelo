import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "zelo_access_token";

export async function saveAccessToken(token: string): Promise<void> {
    if (Platform.OS === "web") {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
        }
        return;
    }

    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken(): Promise<string | null> {
    if (Platform.OS === "web") {
        if (typeof window === "undefined") {
            return null;
        }

        return window.localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function removeAccessToken(): Promise<void> {
    if (Platform.OS === "web") {
        if (typeof window !== "undefined") {
            window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        }
        return;
    }

    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
}