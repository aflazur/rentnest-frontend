"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/http";
import type { Category } from "@/types";

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: () => apiFetch<Category[]>("/categories", { auth: false }),
        staleTime: 5 * 60_000,
    });
}