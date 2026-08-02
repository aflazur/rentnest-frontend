import type { Metadata } from "next";
import { AdminProperties } from "@/components/dashboard/admin-properties";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export const metadata: Metadata = { title: "All Properties — RentNest Admin" };

export default function AdminPropertiesPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Admin</p>
            <h1 className="mt-2 font-display text-3xl text-ink">All properties</h1>
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
                <AdminProperties />
            </div>
        </div>
    );
}