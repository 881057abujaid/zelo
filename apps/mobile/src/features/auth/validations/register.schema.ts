import { z } from "zod";

export const registerSchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(1, "Username is required.")
            .max(30, "Username must be at most 30 characters.")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Use only letters, numbers and underscores.",
            ),

        displayName: z
            .string()
            .trim()
            .max(50, "Display name must be at most 50 characters."),

        email: z
            .string()
            .trim()
            .min(1, "Email address is required.")
            .email("Please enter a valid email address."),

        password: z
            .string()
            .min(1, "Password is required.")
            .min(8, "Password must be at least 8 characters.")
            .max(128, "Password must be at most 128 characters."),

        confirmPassword: z
            .string()
            .min(1, "Please confirm your password."),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match.",
            path: ["confirmPassword"],
        },
    );

export type RegisterFormData = z.infer<typeof registerSchema>;