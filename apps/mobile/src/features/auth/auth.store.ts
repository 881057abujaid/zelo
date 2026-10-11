import { create } from "zustand";

import type { AuthenticatedUser } from "./auth.service";
import {
    getAccessToken,
    removeAccessToken,
    saveAccessToken,
} from "../../lib/secure-storage";

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
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isRestoringSession: true,

    login: async (token, user) => {
        await saveAccessToken(token);

        set({
            user,
            isAuthenticated: true,
        });
    },

    logout: async () => {
        await removeAccessToken();

        set({
            user: null,
            isAuthenticated: false,
        });
    },

    restoreSession: async () => {
        try {
            const token = await getAccessToken();

            if (!token) {
                set({
                    user: null,
                    isAuthenticated: false,
                });
                return;
            }

            // Token mil gaya, lekin user ki identity
            // abhi backend se verify nahi hui hai.
            // Protected navigation se pehle verification add karenge.
            set({
                user: null,
                isAuthenticated: false,
            });
        } catch (error) {
            console.error("Session restoration failed:", error);

            set({
                user: null,
                isAuthenticated: false,
            });
        } finally {
            set({ isRestoringSession: false });
        }
    },
}));