"use client";

import { XCircle } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export function PaymentCancel() {
    return (
        <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-5 text-center">
            <XCircle className="h-10 w-10 text-gold" strokeWidth={1.5} />
            <h1 className="mt-4 font-display text-2xl text-ink">Payment cancelled</h1>
            <p className="mt-2 text-sm text-ink/60">
                No charge was made. You can try paying again anytime from your dashboard.
            </p>
            <LinkButton href="/dashboard/tenant" className="mt-6">
                Back to dashboard
            </LinkButton>
        </div>
    );
}