import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Log in — RentNest" };

export default function LoginPage() {
    return (
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-12">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Welcome back</p>
            <h1 className="mt-2 font-display text-3xl text-ink">Log in to RentNest</h1>
            <p className="mt-2 text-sm text-ink/60">
                Browse listings, track requests, and manage payments.
            </p>
            <div className="mt-8">
                <LoginForm />
            </div>
        </div>
    );
}