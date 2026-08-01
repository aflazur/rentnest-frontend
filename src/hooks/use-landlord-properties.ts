"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiError } from "@/lib/http";
import type { Property } from "@/types";
import { toast } from "sonner";

export type PropertyFormValues = {
    title: string;
    description: string;
    price: number;
    type: string;
    address: string;
    city: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    sizeSqft?: number;
    amenities: string[];
    images: string[];
    categoryId: string;
};

export function useLandlordProperties() {
    return useQuery({
        queryKey: ["landlord", "properties"],
        queryFn: () => apiFetch<Property[]>("/landlord/properties"),
    });
}

export function useCreateProperty() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: PropertyFormValues) =>
            apiFetch<Property>("/landlord/properties", { method: "POST", body: payload }),
        onSuccess: () => {
            toast.success("Property listed successfully");
            queryClient.invalidateQueries({ queryKey: ["landlord", "properties"] });
        },
        onError: (err: ApiError) => toast.error(err.message),
    });
}

export function useUpdateProperty() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, payload }: { id: string; payload: Partial<PropertyFormValues> }) =>
            apiFetch<Property>(`/landlord/properties/${id}`, { method: "PUT", body: payload }),
        onSuccess: () => {
            toast.success("Property updated");
            queryClient.invalidateQueries({ queryKey: ["landlord", "properties"] });
        },
        onError: (err: ApiError) => toast.error(err.message),
    });
}

export function useDeleteProperty() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => apiFetch<null>(`/landlord/properties/${id}`, { method: "DELETE" }),
        onSuccess: () => {
            toast.success("Property removed");
            queryClient.invalidateQueries({ queryKey: ["landlord", "properties"] });
        },
        onError: (err: ApiError) => toast.error(err.message),
    });
}