import app from "./app.js";
import { env } from "./config/env.js";
import { disconnectDatabase } from "./config/prisma.js";

const server = app.listen(env.PORT, "0.0.0.0", () => {
    console.log(
        `🚀 ZELO API running at http://localhost:${env.PORT}`
    );
    console.log(`Environment: ${env.NODE_ENV}`);
});

let isShuttingDown = false;

function shutdown(signal: string) {
    if (isShuttingDown) return;

    isShuttingDown = true;
    console.log(`\n${signal} received. Shutting down server...`);

    server.close(async (error) => {
        try {
            await disconnectDatabase();

            if (error) {
                console.error("Error shutting down server:", error);
                process.exitCode = 1;
                return;
            }

            console.log("Database connections closed.");
            process.exitCode = 0;
        } catch (disconnectError) {
            console.error(
                "Error closing database connections:",
                disconnectError
            );
            process.exitCode = 1;
        }
    });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));