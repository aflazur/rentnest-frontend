"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiError } from "@/lib/http";
import type { Payment } from "@/types";
import { toast } from "sonner";

export function useMyPayments() {
    return useQuery({
        queryKey: ["payments", "mine"],
        queryFn: () => apiFetch<Payment[]>("/payments"),
    });
}

export function usePayment(id: string) {
    return useQuery({
        queryKey: ["payments", id],
        queryFn: () => apiFetch<Payment>(`/payments/${id}`),
        enabled: !!id,
    });
}

export function useCreatePayment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (rentalRequestId: string) =>
            apiFetch<{ payment: Payment; checkoutUrl: string }>("/payments/create", {
                method: "POST",
                body: { rentalRequestId },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payments"] });
        },
        onError: (err: ApiError) => toast.error(err.message),
    });
}