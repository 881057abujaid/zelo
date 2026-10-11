import "dotenv/config";

const port = Number(process.env.PORT ?? 5000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be a valid port number.");
}

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;

if (!jwtAccessSecret || jwtAccessSecret.length < 32) {
    throw new Error(
        "JWT_ACCESS_SECRET must be at least 32 characters long."
    );
}

const jwtAccessExpiresIn =
    process.env.JWT_ACCESS_EXPIRES_IN ?? "15m";

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: port,
    JWT_ACCESS_SECRET: jwtAccessSecret,
    JWT_ACCESS_EXPIRES_IN: jwtAccessExpiresIn,
};