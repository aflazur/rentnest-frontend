"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/http";
import type { RentalRequest, RentalRequestStatus } from "@/types";
import { toast } from "sonner";
import { ApiError } from "@/lib/http";

export function useMyRentalRequests() {
    return useQuery({
        queryKey: ["rentals", "mine"],
        queryFn: () => apiFetch<RentalRequest[]>("/rentals"),
    });
}

export function useRentalRequest(id: string) {
    return useQuery({
        queryKey: ["rentals", id],
        queryFn: () => apiFetch<RentalRequest>(`/rentals/${id}`),
        enabled: !!id,
    });
}

export function useSubmitRentalRequest() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: { propertyId: string; moveInDate: string; message?: string }) =>
            apiFetch<RentalRequest>("/rentals", { method: "POST", body: payload }),
        onSuccess: () => {
            toast.success("Rental request sent to the landlord");
            queryClient.invalidateQueries({ queryKey: ["rentals"] });
        },
        onError: (err: ApiError) => toast.error(err.message),
    });
}

export function useLandlordRequests() {
    return useQuery({
        queryKey: ["landlord", "requests"],
        queryFn: () => apiFetch<RentalRequest[]>("/landlord/requests"),
    });
}

export function useUpdateRentalRequestStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            id,
            status,
            rejectReason,
        }: {
            id: string;
            status: RentalRequestStatus;
            rejectReason?: string;
        }) =>
            apiFetch<RentalRequest>(`/landlord/requests/${id}`, {
                method: "PATCH",
                body: { status, rejectReason },
            }),
        onSuccess: (_, variables) => {
            toast.success(
                variables.status === "APPROVED" ? "Request approved" : "Request rejected"
            );
            queryClient.invalidateQueries({ queryKey: ["landlord", "requests"] });
        },
        onError: (err: ApiError) => toast.error(err.message),
    });
}