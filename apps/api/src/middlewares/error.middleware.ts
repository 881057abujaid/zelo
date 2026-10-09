import type {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction,
} from "express";

export function notFoundHandler(
    _req: Request,
    res: Response
) {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
}

export const errorHandler: ErrorRequestHandler = (
    error,
    _req,
    res,
    _next
) => {
    console.error("API Error:", error);

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
};