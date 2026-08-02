# RentNest — Frontend 🏠

Next.js (App Router) frontend for the RentNest rental property marketplace.
Consumes the [RentNest backend API](../rentnest-backend).

## Tech Stack

- Next.js 16 (App Router, Server + Client Components)
- TypeScript
- Tailwind CSS v4
- TanStack Query (server state / data fetching)
- React Hook Form + Zod (form state & validation)
- Sonner (toast notifications)
- Stripe Checkout (redirect-based, via the backend's hosted checkout session)

## Getting started

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run the dev server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## Roles

Register as either a **Tenant** or a **Landlord** from `/auth/register`. An
**Admin** account must already exist in the backend (seeded via the backend's
`npm run seed`). Routes under `/dashboard/*` are protected by
`middleware.ts`, which checks the session cookie and redirects based on role.

## Payment flow

Tenants pay through Stripe Checkout (hosted by Stripe, session created by the
backend). After payment, Stripe redirects back to this app's
`/payment/success` or `/payment/cancel` pages. See `API_INTEGRATION.md` for
the full flow and the required backend `FRONTEND_URL` environment variable.

## Deployment (Vercel)

1. Push this repo to GitHub, import it in Vercel.
2. Set the environment variable `NEXT_PUBLIC_API_BASE_URL` to your deployed
   backend's API URL (e.g. `https://rentnest-backend-three.vercel.app/api`).
3. On the **backend** deployment, set `FRONTEND_URL` to this app's deployed
   URL so Stripe redirects land on the frontend's success/cancel pages.
4. Deploy.

## Project structure

```
src/
  app/                 routes (App Router)
    api/auth/          login/register/logout route handlers (proxy to backend)
    auth/               login, register
    properties/         public listing + details
    dashboard/tenant/    tenant dashboard, payment flow
    dashboard/landlord/  landlord dashboard, property CRUD, requests
    dashboard/admin/     admin dashboard, users, properties, rentals
    payment/             success / cancel pages
  components/
    auth/, properties/, dashboard/, layout/, ui/
  hooks/                 TanStack Query hooks per resource
  lib/                   API client, session/cookie helpers, Zod schemas, utils
  types/                 shared TypeScript types matching the backend's Prisma models
  middleware.ts          JWT-cookie route protection + role-based redirects
```
