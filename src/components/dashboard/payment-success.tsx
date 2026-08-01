"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { apiFetch, ApiError } from "@/lib/http";
import type { Payment } from "@/types";
import { LinkButton } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function PaymentSuccess() {
    const searchParams = useSearchParams();
    const transactionId = searchParams.get("transactionId") ?? "";
    const sessionId = searchParams.get("session_id") ?? "";

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["payment-confirm", transactionId, sessionId],
        queryFn: () =>
            apiFetch<Payment>(
                `/payments/confirm?transactionId=${encodeURIComponent(transactionId)}&session_id=${encodeURIComponent(sessionId)}`,
                { auth: false }
            ),
        enabled: !!transactionId,
        retry: false,
    });

    if (isLoading) {
        return (
            <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-5 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-pine" />
                <p className="mt-4 text-sm text-ink/60">Confirming your payment with Stripe...</p>
            </div>
        );
    }

    if (isError) {
        const message = error instanceof ApiError ? error.message : "Could not confirm payment";
        return (
            <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-5 text-center">
                <XCircle className="h-10 w-10 text-red" strokeWidth={1.5} />
                <h1 className="mt-4 font-display text-2xl text-ink">Payment not verified</h1>
                <p className="mt-2 text-sm text-ink/60">{message}</p>
                <LinkButton href="/dashboard/tenant" className="mt-6">
                    Back to dashboard
                </LinkButton>
            </div>
        );
    }

    return (
        <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-5 text-center">
            <CheckCircle2 className="h-10 w-10 text-moss" strokeWidth={1.5} />
            <h1 className="mt-4 font-display text-2xl text-ink">Payment successful</h1>
            <p className="mt-2 text-sm text-ink/60">
                {data ? `${formatCurrency(data.amount)} paid — your rental is now active.` : "Your rental is now active."}
            </p>
            <LinkButton href="/dashboard/tenant" className="mt-6">
                Go to your dashboard
            </LinkButton>
        </div>
    );
}