"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
            <AlertTriangle className="h-10 w-10 text-red" strokeWidth={1.5} />
            <h1 className="mt-4 font-display text-2xl text-ink">Something went wrong</h1>
            <p className="mt-2 text-sm text-ink/60">
                An unexpected error occurred while loading this page.
            </p>
            <Button onClick={reset} className="mt-6">
                Try again
            </Button>
        </div>
    );
}