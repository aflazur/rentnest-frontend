"use client";

import { Users } from "lucide-react";
import { useAdminUsers, useToggleUserStatus } from "@/hooks/use-admin";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";

export function AdminUsers() {
    const { data: users, isLoading } = useAdminUsers();
    const toggle = useToggleUserStatus();

    if (isLoading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-14 w-full" />
                ))}
            </div>
        );
    }

    if (!users || users.length === 0) {
        return <EmptyState icon={Users} title="No users found" />;
    }

    return (
        <div className="overflow-x-auto rounded-md border border-line bg-white/60">
            <table className="w-full text-left text-sm">
                <thead className="border-b border-line text-xs uppercase tracking-wide text-ink/50">
                    <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3" />
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id} className="border-b border-line last:border-0">
                            <td className="px-4 py-3 font-medium text-ink">{u.name}</td>
                            <td className="px-4 py-3 text-ink/70">{u.email}</td>
                            <td className="px-4 py-3">
                                <span className="font-mono text-xs text-ink/50">{u.role}</span>
                            </td>
                            <td className="px-4 py-3">
                                {u.activeStatus && (
                                    <StatusBadge status={u.activeStatus === "ACTIVE" ? "AVAILABLE" : "REJECTED"} />
                                )}
                            </td>
                            <td className="px-4 py-3 text-right">
                                {u.role !== "ADMIN" && (
                                    <Button
                                        variant={u.activeStatus === "BLOCKED" ? "outline" : "danger"}
                                        size="sm"
                                        loading={toggle.isPending}
                                        onClick={() =>
                                            toggle.mutate({
                                                id: u.id,
                                                activeStatus: u.activeStatus === "BLOCKED" ? "ACTIVE" : "BLOCKED",
                                            })
                                        }
                                    >
                                        {u.activeStatus === "BLOCKED" ? "Unban" : "Ban"}
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}