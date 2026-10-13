import { create } from "zustand";

import type { AuthenticatedUser } from "./auth.service";

import {
    getCurrentUser,
    isUnauthorizedError,
    completeUserOnboarding,
} from "./auth.service";

import {
    getAccessToken,
    removeAccessToken,
    saveAccessToken,
} from "@/lib/secure-storage";

import {
    updateUserProfile,
} from "@/features/profile/profile.service";

import type {
    UpdateProfilePayload,
} from "@/features/profile/profile.service";

interface AuthState {
    user: AuthenticatedUser | null;
    isAuthenticated: boolean;
    isRestoringSession: boolean;

    login: (
        token: string,
        user: AuthenticatedUser,
    ) => Promise<void>;

    logout: () => Promise<void>;

    restoreSession: () => Promise<void>;

    completeOnboarding: () => Promise<void>;

    updateProfile: (
        payload: UpdateProfilePayload,
    ) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isRestoringSession: true,

    login: async (token, user) => {
        await saveAccessToken(token);

        set({ user, isAuthenticated: true });
    },

    logout: async () => {
        try {
            await removeAccessToken();
        } finally {
            set({
                user: null,
                isAuthenticated: false,
            });
        }
    },

    restoreSession: async () => {
        set({
            isRestoringSession: true,
        });

        try {
            const token = await getAccessToken();

            if (!token) {
                set({ user: null, isAuthenticated: false });
                return;
            }

            if (!token) {
                set({
                    user: null,
                    isAuthenticated: false,
                });

                return;
            }

            // Ask the backend to verify the saved token.
            const user = await getCurrentUser(token);

            set({ user, isAuthenticated: true });

            set({
                user,
                isAuthenticated: true,
            });
        } catch (error) {
            set({
                user: null,
                isAuthenticated: false,
            });

            if (isUnauthorizedError(error)) {
                // Invalid or expired token: remove it.
                try {
                    await removeAccessToken();
                } catch (storageError) {
                    console.error(
                        "Unable to remove invalid access token:",
                        storageError,
                    );
                }
            } else {
                // Network/server errors do not necessarily
                // mean the saved token is invalid.
                console.error(
                    "Session restoration failed:",
                    error,
                );
            }
        } finally {
            set({
                isRestoringSession: false,
            });
        }
    },

    completeOnboarding: async () => {
        const token = await getAccessToken();

        if (!token) {
            throw new Error("Authentication required to complete onboarding.");
        }

        await completeUserOnboarding(token);

        set((state) => ({
            user: state.user
                ? {
                    ...state.user,
                    isOnboardingComplete: true,
                }
                : null,
        }));
    },

    updateProfile: async (payload) => {
        const updatedUser = await updateUserProfile(payload);

        set({
            user: updatedUser,
        });
    },
}));