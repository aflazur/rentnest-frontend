"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiError } from "@/lib/http";
import type { User, Property, RentalRequest } from "@/types";
import { toast } from "sonner";

export function useAdminUsers() {
    return useQuery({
        queryKey: ["admin", "users"],
        queryFn: () => apiFetch<User[]>("/admin/users"),
    });
}

export function useAdminProperties() {
    return useQuery({
        queryKey: ["admin", "properties"],
        queryFn: () => apiFetch<Property[]>("/admin/properties"),
    });
}

export function useAdminRentals() {
    return useQuery({
        queryKey: ["admin", "rentals"],
        queryFn: () => apiFetch<RentalRequest[]>("/admin/rentals"),
    });
}

export function useToggleUserStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, activeStatus }: { id: string; activeStatus: "ACTIVE" | "BLOCKED" }) =>
            apiFetch<User>(`/admin/users/${id}`, { method: "PATCH", body: { activeStatus } }),
        onSuccess: (_, variables) => {
            toast.success(variables.activeStatus === "BLOCKED" ? "User banned" : "User unbanned");
            queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
        },
        onError: (err: ApiError) => toast.error(err.message),
    });
}