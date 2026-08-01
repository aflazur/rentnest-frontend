"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { loginSchema, type LoginValues } from "@/lib/schemas/auth";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Role } from "@/types";

const ROLE_HOME: Record<Role, string> = {
    TENANT: "/dashboard/tenant",
    LANDLORD: "/dashboard/landlord",
    ADMIN: "/dashboard/admin",
};

export function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

    async function onSubmit(values: LoginValues) {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        });
        const json = await res.json();

        if (!res.ok || !json.success) {
            setError("root", { message: json.message ?? "Login failed" });
            toast.error(json.message ?? "Login failed");
            return;
        }

        toast.success(`Welcome back, ${json.data.user.name.split(" ")[0]}!`);
        const next = searchParams.get("next");
        router.push(next ?? ROLE_HOME[json.data.user.role as Role]);
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                <FieldError message={errors.email?.message} />
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
                <FieldError message={errors.password?.message} />
            </div>

            {errors.root && (
                <p className="rounded-sm border border-red/30 bg-red/5 px-3 py-2 text-sm text-red">
                    {errors.root.message}
                </p>
            )}

            <Button type="submit" className="w-full" loading={isSubmitting}>
                Log in
            </Button>

            <p className="text-center text-sm text-ink/60">
                New to RentNest?{" "}
                <Link href="/auth/register" className="font-medium text-pine hover:underline">
                    Create an account
                </Link>
            </p>
        </form>
    );
}