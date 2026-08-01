"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetchWithMeta } from "@/lib/http";
import type { Property } from "@/types";

export type PropertyFilters = {
    city?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: number;
    limit?: number;
};

function buildQuery(filters: PropertyFilters) {
    const params = new URLSearchParams();
    if (filters.city) params.set("city", filters.city);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    params.set("page", String(filters.page ?? 1));
    params.set("limit", String(filters.limit ?? 12));
    return params.toString();
}

export function useProperties(filters: PropertyFilters) {
    return useQuery({
        queryKey: ["properties", filters],
        queryFn: () =>
            apiFetchWithMeta<Property[]>(`/properties?${buildQuery(filters)}`, { auth: false }),
    });
}

export function useProperty(id: string) {
    return useQuery({
        queryKey: ["property", id],
        queryFn: () => apiFetchWithMeta<Property>(`/properties/${id}`, { auth: false }),
        enabled: !!id,
    });
}