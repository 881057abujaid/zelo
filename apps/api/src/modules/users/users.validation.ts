import { z } from "zod";

export const updateProfileSchema = z
    .object({
        username: z
            .string()
            .trim()
            .min(3, "Username must be at least 3 characters long")
            .max(30, "Username cannot exceed 30 characters")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Username can only contain letters, numbers, and underscores"
            )
            .transform((value) => value.toLowerCase())
            .optional(),

        displayName: z
            .string()
            .trim()
            .min(2, "Display name must be at least 2 characters long")
            .max(50, "Display name cannot exceed 50 characters")
            .nullable()
            .optional(),

        avatarUrl: z
            .string()
            .trim()
            .url("Please provide a valid avatar URL")
            .max(2048, "Avatar URL cannot exceed 2048 characters")
            .nullable()
            .optional(),
    })
    .strict()
    .refine(
        (data) =>
            data.username !== undefined ||
            data.displayName !== undefined ||
            data.avatarUrl !== undefined,
        {
            message: "At least one profile field must be provided",
        }
    );

export type UpdateProfileInput = z.infer<
    typeof updateProfileSchema
>;