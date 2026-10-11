import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { registerUser, loginUser } from "./auth.service.js";

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const validationResult = registerSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationResult.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                })),
            });
        }

        const user = await registerUser(validationResult.data);

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            data: {
                user,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "USERNAME_ALREADY_EXISTS") {
                return res.status(409).json({
                    success: false,
                    message: "Username is already taken",
                });
            }

            if (error.message === "EMAIL_ALREADY_EXISTS") {
                return res.status(409).json({
                    success: false,
                    message: "An account with this email already exists",
                });
            }

            if (error.message === "ACCOUNT_ALREADY_EXISTS") {
                return res.status(409).json({
                    success: false,
                    message: "An account with these details already exists",
                });
            }
        }

        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
            });
        }

        return next(error);
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationResult.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }

    try {
        const result = await loginUser(validationResult.data);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "INVALID_CREDENTIALS"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        return next(error);
    }
}