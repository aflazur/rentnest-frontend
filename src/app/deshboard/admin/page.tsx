import type { Metadata } from "next";
import { AdminOverview } from "@/components/dashboard/admin-overview";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export const metadata: Metadata = { title: "Admin Dashboard — RentNest" };

export default function AdminDashboardPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Admin</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Platform overview</h1>
            <p className="mt-2 text-sm text-ink/60">
                Monitor users, listings, and rental activity across RentNest.
            </p>
            <div className="mt-6">
                <DashboardTabs
                    tabs={[
                        { href: "/dashboard/admin", label: "Overview" },
                        { href: "/dashboard/admin/users", label: "Users" },
                        { href: "/dashboard/admin/properties", label: "Properties" },
                        { href: "/dashboard/admin/rentals", label: "Rental Requests" },
                    ]}
                />
            </div>
            <div className="mt-8">
                <AdminOverview />
            </div>
        </div>
    );
}