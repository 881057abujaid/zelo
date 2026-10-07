import type { ExecutionResult } from "./types";

export interface CodeExecutor {
    execute(code: string): Promise<ExecutionResult>;
}