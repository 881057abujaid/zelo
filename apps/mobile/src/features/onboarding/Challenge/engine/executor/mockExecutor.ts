import type { CodeExecutor } from "./executor";
import type { ExecutionResult } from "./types";

export class MockExecutor implements CodeExecutor {
    async execute(code: string): Promise<ExecutionResult> {
        if (!code.trim()) {
            return {
                status: "error",
                output: "",
                error: "Code cannot be empty.",
            };
        }

        return {
            status: "success",
            output: "Mock execution successful.",
            executionTime: 10,
        };
    }
}