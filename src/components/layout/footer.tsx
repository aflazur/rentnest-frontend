export function Footer() {
    return (
        <footer className="border-t border-line py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-ink/50 sm:flex-row">
                <p>© {new Date().getFullYear()} RentNest. Find & list rental properties with ease.</p>
                <p className="font-mono">Built with Next.js · Prisma · Stripe</p>
            </div>
        </footer>
    );
}