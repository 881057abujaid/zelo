import { api } from "../../lib/api";

export interface RegisterPayload {
    username: string;
    displayName: string;
    email: string;
    password: string;
}

export interface RegisteredUser {
    id: string;
    username: string;
    email: string;
    displayName: string | null;
    totalXp: number;
    createdAt: string;
}

interface RegisterResponse {
    success: true;
    message: string;
    data: {
        user: RegisteredUser;
    };
}

interface ApiErrorResponse {
    success: false;
    message: string;
    errors?: {
        field: string;
        message: string;
    }[];
}

export async function registerUser(
    payload: RegisterPayload,
): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>(
        "/auth/register",
        payload,
    );

    return response.data;
}

export function getRegisterErrorMessage(error: unknown): string {
    if (typeof error === "object" && error !== null && "response" in error) {
        const response = (
            error as {
                response?: {
                    data?: ApiErrorResponse;
                };
            }
        ).response;

        if (response?.data?.message) {
            return response.data.message;
        }
    }

    if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "ECONNABORTED"
    ) {
        return "Request timed out. Please try again.";
    }

    return "Unable to create your account. Please check your connection and try again.";
}