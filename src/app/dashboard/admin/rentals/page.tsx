import type { Metadata } from "next";
import { AdminRentals } from "@/components/dashboard/admin-rentals";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export const metadata: Metadata = { title: "All Rental Requests — RentNest Admin" };

export default function AdminRentalsPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Admin</p>
            <h1 className="mt-2 font-display text-3xl text-ink">All rental requests</h1>
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
                <AdminRentals />
            </div>
        </div>
    );
}