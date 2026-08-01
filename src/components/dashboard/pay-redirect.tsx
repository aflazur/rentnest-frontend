"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { useCreatePayment } from "@/hooks/use-payments";
import { LinkButton } from "@/components/ui/button";
import { ApiError } from "@/lib/http";

export function PayRedirect({ rentalRequestId }: { rentalRequestId: string }) {
    const create = useCreatePayment();
    const [error, setError] = useState<string | null>(null);
    const started = useRef(false);

    useEffect(() => {
        if (started.current) return;
        started.current = true;

        create.mutate(rentalRequestId, {
            onSuccess: (data) => {
                window.location.href = data.checkoutUrl;
            },
            onError: (err) => {
                setError(err instanceof ApiError ? err.message : "Could not start payment");
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rentalRequestId]);

    if (error) {
        return (
            <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-5 text-center">
                <AlertTriangle className="h-8 w-8 text-red" strokeWidth={1.5} />
                <p className="mt-4 font-display text-xl text-ink">Couldn&apos;t start payment</p>
                <p className="mt-2 text-sm text-ink/60">{error}</p>
                <LinkButton href="/dashboard/tenant" className="mt-6" variant="outline">
                    Back to dashboard
                </LinkButton>
            </div>
        );
    }

    return (
        <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-5 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-pine" />
            <p className="mt-4 text-sm text-ink/60">Redirecting you to Stripe checkout...</p>
        </div>
    );
}