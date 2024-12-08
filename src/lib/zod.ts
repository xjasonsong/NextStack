import { z } from "zod";

export const EmailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type EmailInput = z.infer<typeof EmailSchema>;
