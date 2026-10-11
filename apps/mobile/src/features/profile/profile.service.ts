import axios from "axios";

import { api } from "@/lib/api";
import { getAccessToken } from "@/lib/secure-storage";

import type { AuthenticatedUser } from "@/features/auth/auth.service";

export interface UpdateProfilePayload {
    username?: string;
    displayName?: string | null;
    avatarUrl?: string | null;
}

interface UpdateProfileResponse {
    success: true;
    message: string;
    data: {
        user: AuthenticatedUser & {
            createdAt: string;
            updatedAt: string;
        };
    };
}

export async function updateUserProfile(
    payload: UpdateProfilePayload,
): Promise<AuthenticatedUser> {
    const token = await getAccessToken();

    if (!token) {
        throw new Error("Your session has expired. Please log in again.");
    }

    const response = await api.patch<UpdateProfileResponse>(
        "/users/me",
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data.data.user;
}

export function getProfileErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        if (status === 401) {
            return "Your session has expired. Please log in again.";
        }

        if (status === 409) {
            return "This username is already taken. Please choose another.";
        }

        if (status === 400) {
            return message ?? "Please check your profile information.";
        }

        if (error.code === "ECONNABORTED") {
            return "Request timed out. Please try again.";
        }
    }

    if (error instanceof Error && error.message) {
        return error.message;
    }

    return "Unable to update your profile. Please try again.";
}