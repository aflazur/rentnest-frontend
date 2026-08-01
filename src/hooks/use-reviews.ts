"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch, ApiError } from "@/lib/http";
import type { Review } from "@/types";
import { toast } from "sonner";

export function usePropertyReviews(propertyId: string) {
    return useQuery({
        queryKey: ["reviews", propertyId],
        queryFn: () => apiFetch<Review[]>(`/reviews/property/${propertyId}`, { auth: false }),
        enabled: !!propertyId,
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: { rentalRequestId: string; rating: number; comment?: string }) =>
            apiFetch<Review>("/reviews", { method: "POST", body: payload }),
        onSuccess: (review) => {
            toast.success("Review submitted, thanks!");
            queryClient.invalidateQueries({ queryKey: ["reviews", review.propertyId] });
            queryClient.invalidateQueries({ queryKey: ["rentals"] });
        },
        onError: (err: ApiError) => toast.error(err.message),
    });
}