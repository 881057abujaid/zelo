import axios from "axios";
import { Platform } from "react-native";
import { getAccessToken } from "./secure-storage";

const API_HOST = process.env.EXPO_PUBLIC_API_HOST || "localhost";

const API_BASE_URL =
    Platform.OS === "web"
        ? "http://localhost:5000/api/v1"
        : `http://${API_HOST}:5000/api/v1`;

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Prevent circular dependency between api.ts and auth.store.ts.
type UnauthorizedHandler = () => void | Promise<void>;

let unauthorizedHandler: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(
    handler: UnauthorizedHandler,
): void {
    unauthorizedHandler = handler;
}

// Attach the saved access token to API requests automatically.
api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();

    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
});

// Handle unauthorized responses centrally.
api.interceptors.response.use(
    (response) => response,
    async (error: unknown) => {
        if (
            axios.isAxiosError(error) &&
            error.response?.status === 401
        ) {
            const url = error.config?.url ?? "";

            // Login and registration can return 401 without
            // indicating that an existing session is invalid.
            const isAuthEntryRequest =
                url.includes("/auth/login") ||
                url.includes("/auth/register");

            if (!isAuthEntryRequest) {
                await unauthorizedHandler?.();
            }
        }

        return Promise.reject(error);
    },
);