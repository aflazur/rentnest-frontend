import type { Metadata } from "next";
import { TenantDashboard } from "@/components/dashboard/tenant-dashboard";

export const metadata: Metadata = { title: "Tenant Dashboard — RentNest" };

export default function TenantDashboardPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Tenant</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Your rentals</h1>
            <p className="mt-2 text-sm text-ink/60">
                Track your requests, pay for approved rentals, and leave reviews.
            </p>
            <div className="mt-8">
                <TenantDashboard />
            </div>
        </div>
    );
}