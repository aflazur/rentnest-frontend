"use client";

import { useState } from "react";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { ApiError } from "@/lib/http";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 30_000,
                        retry: 1,
                    },
                },
                queryCache: new QueryCache({
                    onError: (error, query) => {
                        // Mutations already surface their own toasts (see hooks/*). Only
                        // show a global toast for background query failures so the user
                        // isn't left staring at a silently-empty screen.
                        if (query.state.data !== undefined) return; // had cached data, fail quietly
                        const message =
                            error instanceof ApiError ? error.message : "Network error — please try again.";
                        toast.error(message);
                    },
                }),
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "var(--color-pine)",
                        color: "var(--color-paper)",
                        border: "none",
                        fontFamily: "var(--font-sans)",
                    },
                }}
            />
        </QueryClientProvider>
    );
}
