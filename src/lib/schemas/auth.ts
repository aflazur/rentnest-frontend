import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().min(1, "Email is required").email("Enter a valid email"),
        phone: z
            .string()
            .min(6, "Enter a valid phone number")
            .regex(/^[0-9+\-\s]+$/, "Phone can only contain digits, spaces, + and -"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        role: z.enum(["TENANT", "LANDLORD"], { error: "Choose a role" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export type RegisterValues = z.infer<typeof registerSchema>;