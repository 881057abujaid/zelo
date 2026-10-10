import { z } from "zod";

export const registerSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters long")
        .max(30, "Username cannot exceed 30 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        )
        .transform((value) => value.toLowerCase()),

    email: z
        .string()
        .trim()
        .email("Please provide a valid email address")
        .transform((value) => value.toLowerCase()),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(128, "Password cannot exceed 128 characters"),

    displayName: z
        .string()
        .trim()
        .min(2, "Display name must be at least 2 characters long")
        .max(50, "Display name cannot exceed 50 characters")
        .optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;