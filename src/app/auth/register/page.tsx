import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: "Create account — RentNest" };

export default function RegisterPage() {
    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Join RentNest</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Create your account</h1>
            <p className="mt-2 text-sm text-ink/60">
                Sign up as a tenant to find your next home, or a landlord to list one.
            </p>
            <div className="mt-8">
                <RegisterForm />
            </div>
        </div>
    );
}