import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

const ROLE_HOME: Record<string, string> = {
    TENANT: "/dashboard/tenant",
    LANDLORD: "/dashboard/landlord",
    ADMIN: "/dashboard/admin",
};

export default async function DashboardIndexPage() {
    const session = await getSession();

    if (!session) redirect("/auth/login");
    redirect(ROLE_HOME[session.role] ?? "/");
}