const ACCESS_TOKEN_KEY = "zelo_access_token";

let accessToken: string | null = null;

export async function saveAccessToken(token: string): Promise<void> {
    accessToken = token;
}

export async function getAccessToken(): Promise<string | null> {
    return accessToken;
}

export async function removeAccessToken(): Promise<void> {
    accessToken = null;
}