import type { Metadata } from "next";
import { AdminUsers } from "@/components/dashboard/admin-users";
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs";

export const metadata: Metadata = { title: "Manage Users — RentNest Admin" };

export default function AdminUsersPage() {
    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Admin</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Manage users</h1>
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
                <AdminUsers />
            </div>
        </div>
    );
}