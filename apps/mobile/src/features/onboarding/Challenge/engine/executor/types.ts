export type ExecutionStatus =
    | "success"
    | "error"
    | 'timeout';

export type ExecutionResult = {
    status: ExecutionStatus;

    output: string;

    error?: string;

    executionTime?: number;
};