import app from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, "0.0.0.0", () => {
    console.log(
        `🚀 ZELO API running at http://localhost:${env.PORT}`
    );

    console.log(`Environment: ${env.NODE_ENV}`);
});

function shutdown(signal: string) {
    console.log(`\n${signal} received. Shutting down server...`);

    server.close((error) => {
        if (error) {
            console.error("Error shutting down server:", error);
            process.exitCode = 1;
            return;
        }

        process.exitCode = 0;
    });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));