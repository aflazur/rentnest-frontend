"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { registerSchema, type RegisterValues } from "@/lib/schemas/auth";
import { Input, Label, FieldError } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Role } from "@/types";

const ROLE_HOME: Record<Role, string> = {
    TENANT: "/dashboard/tenant",
    LANDLORD: "/dashboard/landlord",
    ADMIN: "/dashboard/admin",
};

export function RegisterForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: { role: "TENANT" },
    });

    const role = watch("role");

    async function onSubmit(values: RegisterValues) {
        const { confirmPassword, ...payload } = values;
        void confirmPassword;

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const json = await res.json();

        if (!res.ok || !json.success) {
            setError("root", { message: json.message ?? "Registration failed" });
            toast.error(json.message ?? "Registration failed");
            return;
        }

        toast.success("Account created — welcome to RentNest!");
        router.push(ROLE_HOME[json.data.user.role as Role]);
        router.refresh();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div>
                <Label>I am a</Label>
                <div className="grid grid-cols-2 gap-2">
                    {(["TENANT", "LANDLORD"] as const).map((r) => (
                        <button
                            type="button"
                            key={r}
                            onClick={() => setValue("role", r, { shouldValidate: true })}
                            className={cn(
                                "rounded-sm border px-3 py-2.5 text-sm font-medium transition-colors",
                                role === r
                                    ? "border-pine bg-pine text-paper"
                                    : "border-line bg-paper text-ink/70 hover:border-pine/50"
                            )}
                        >
                            {r === "TENANT" ? "Tenant" : "Landlord"}
                        </button>
                    ))}
                </div>
                <FieldError message={errors.role?.message} />
            </div>

            <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Sadia Rahman" {...register("name")} />
                <FieldError message={errors.name?.message} />
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                <FieldError message={errors.email?.message} />
            </div>

            <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="01700000000" {...register("phone")} />
                <FieldError message={errors.phone?.message} />
            </div>

            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" {...register("password")} />
                <FieldError message={errors.password?.message} />
            </div>

            <div>
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                />
                <FieldError message={errors.confirmPassword?.message} />
            </div>

            {errors.root && (
                <p className="rounded-sm border border-red/30 bg-red/5 px-3 py-2 text-sm text-red">
                    {errors.root.message}
                </p>
            )}

            <Button type="submit" className="w-full" loading={isSubmitting}>
                Create account
            </Button>

            <p className="text-center text-sm text-ink/60">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-pine hover:underline">
                    Log in
                </Link>
            </p>
        </form>
    );
}