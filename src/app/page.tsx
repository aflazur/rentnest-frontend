import { Suspense } from "react";
import { ArrowRight, ShieldCheck, KeyRound, ClipboardCheck } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertyCardSkeleton } from "@/components/ui/skeleton";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Browse & request",
    body: "Filter listings by city, price, and type, then send a request to the landlord.",
  },
  {
    icon: ShieldCheck,
    title: "Get approved",
    body: "The landlord reviews your request and approves it when it's a fit.",
  },
  {
    icon: KeyRound,
    title: "Pay & move in",
    body: "Complete a secure Stripe checkout and the property is yours.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-line bg-paper-dim/50">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              Rental marketplace
            </p>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] text-ink sm:text-6xl">
              Find & list rental
              <br />
              properties with ease
            </h1>
            <p className="mt-5 max-w-md text-base text-ink/65">
              RentNest connects tenants and landlords — browse verified listings, request
              to rent, and pay securely, all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/properties" size="lg">
                Browse properties <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/auth/register" variant="outline" size="lg">
                List your property
              </LinkButton>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="flex items-start gap-3 rounded-md border border-line bg-white/60 p-4"
              >
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <div>
                  <p className="flex items-center gap-2 font-medium text-ink">
                    <step.icon className="h-4 w-4 text-pine" />
                    {step.title}
                  </p>
                  <p className="mt-1 text-sm text-ink/60">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              Fresh on the market
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              Featured properties
            </h2>
          </div>
          <LinkButton href="/properties" variant="ghost" size="sm">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </LinkButton>
        </div>
        <div className="mt-8">
          <Suspense
            fallback={
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <PropertyGrid />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
