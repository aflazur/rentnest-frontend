import { z } from "zod";

export const rentalRequestSchema = z.object({
    moveInDate: z.string().min(1, "Choose a move-in date"),
    message: z.string().max(500, "Keep it under 500 characters").optional(),
});

export type RentalRequestValues = z.infer<typeof rentalRequestSchema>;

export const reviewSchema = z.object({
    rating: z.number().int().min(1, "Pick a rating").max(5, "Pick a rating"),
    comment: z.string().max(1000, "Keep it under 1000 characters").optional(),
});

export type ReviewValues = z.infer<typeof reviewSchema>;

export const propertySchema = z.object({
    title: z.string().min(3, "Title is too short").max(120),
    description: z.string().min(10, "Add a bit more detail").max(2000),
    price: z.coerce.number().positive("Price must be greater than 0"),
    type: z.enum(["APARTMENT", "HOUSE", "STUDIO", "CONDO", "ROOM"], { error: "Choose a type" }),
    address: z.string().min(3, "Address is required"),
    city: z.string().min(2, "City is required"),
    area: z.string().min(2, "Area is required"),
    bedrooms: z.coerce.number().int().min(0),
    bathrooms: z.coerce.number().int().min(0),
    sizeSqft: z.coerce.number().int().min(0).optional(),
    amenities: z.string().optional(),
    images: z.string().optional(),
    categoryId: z.string().min(1, "Choose a category"),
});

export type PropertyValues = z.infer<typeof propertySchema>;