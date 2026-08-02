import Link from "next/link";
import { Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
            <Compass className="h-10 w-10 text-ink/30" strokeWidth={1.5} />
            <h1 className="mt-4 font-display text-2xl text-ink">Page not found</h1>
            <p className="mt-2 text-sm text-ink/60">
                The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <LinkButton href="/" className="mt-6">
                Back home
            </LinkButton>
            <Link href="/properties" className="mt-3 text-sm text-pine hover:underline">
                Browse properties instead
            </Link>
        </div>
    );
}
