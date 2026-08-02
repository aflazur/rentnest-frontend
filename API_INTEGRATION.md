# API Integration Map

This maps every frontend surface to the RentNest backend endpoint(s) it consumes.
Backend repo: `rentnest-backend`. Base URL is set via `NEXT_PUBLIC_API_BASE_URL`.

## Auth

| Frontend | Backend endpoint |
|---|---|
| `POST /api/auth/login` (Next.js route handler, proxies then sets session cookies) | `POST {API}/auth/login` |
| `POST /api/auth/register` (Next.js route handler) | `POST {API}/auth/register` |
| `POST /api/auth/logout` (Next.js route handler, clears cookies) | — (client-side only) |
| `middleware.ts` (route protection) | reads the `rentnest_access_token` / `rentnest_user` cookies set above |

Login/register are proxied through the frontend's own route handlers (not called
directly from the browser) so the session cookies can be set on the frontend's
own domain. This avoids the `SameSite` cross-site cookie problem that occurs
when the frontend and backend are deployed to two different Vercel domains and
the backend tries to set an httpOnly cookie directly. All other API calls go
straight from the browser to the backend, with the access token attached as a
`Bearer` header (read from the cookie client-side).

## Public / Property Browsing

| Route | Component | Backend endpoint |
|---|---|---|
| `/` | `PropertyGrid` (featured) | `GET {API}/properties` |
| `/properties` | `PropertyFilters`, `PropertyGrid` | `GET {API}/properties?city=&type=&minPrice=&maxPrice=&page=&limit=` |
| `/properties/[id]` | `PropertyDetails` | `GET {API}/properties/:id` |
| `/properties/[id]` (reviews section) | `PropertyDetails` | `GET {API}/reviews/property/:propertyId` |
| Property/landlord forms | `PropertyForm` | `GET {API}/categories` |

## Tenant

| Route | Component | Backend endpoint |
|---|---|---|
| `/properties/[id]` (Request to rent modal) | `RequestRentModal` | `POST {API}/rentals` |
| `/dashboard/tenant` | `TenantDashboard` | `GET {API}/rentals`, `GET {API}/payments` |
| `/dashboard/tenant` (leave review) | `LeaveReviewModal` | `POST {API}/reviews` |
| `/dashboard/tenant/requests/[id]/pay` | `PayRedirect` | `POST {API}/payments/create` → redirects to Stripe `checkoutUrl` |
| `/payment/success` | `PaymentSuccess` | `GET {API}/payments/confirm?transactionId=&session_id=` |
| `/payment/cancel` | `PaymentCancel` | — (display only, no call) |

## Landlord

| Route | Component | Backend endpoint |
|---|---|---|
| `/dashboard/landlord` | `LandlordProperties` | `GET {API}/landlord/properties` |
| `/dashboard/landlord/properties/new` | `PropertyForm` | `POST {API}/landlord/properties` |
| `/dashboard/landlord/properties/[id]/edit` | `PropertyForm` | `GET {API}/properties/:id`, `PUT {API}/landlord/properties/:id` |
| `/dashboard/landlord` (delete) | `LandlordProperties` | `DELETE {API}/landlord/properties/:id` |
| `/dashboard/landlord/requests` | `LandlordRequests` | `GET {API}/landlord/requests`, `PATCH {API}/landlord/requests/:id` |

## Admin

| Route | Component | Backend endpoint |
|---|---|---|
| `/dashboard/admin` | `AdminOverview` | `GET {API}/admin/users`, `GET {API}/admin/properties`, `GET {API}/admin/rentals` (counts) |
| `/dashboard/admin/users` | `AdminUsers` | `GET {API}/admin/users`, `PATCH {API}/admin/users/:id` (ban/unban) |
| `/dashboard/admin/properties` | `AdminProperties` | `GET {API}/admin/properties` |
| `/dashboard/admin/rentals` | `AdminRentals` | `GET {API}/admin/rentals` |

## Payment flow (important backend-side change)

The original backend redirected Stripe's `success_url`/`cancel_url` straight to
the API (`/api/payments/confirm`). For the frontend to show a proper UI on
success/cancel, there are two ways to fix this — pick whichever fits:

**Option A — redeploy the backend with the redirect fix (recommended if you
can freely redeploy your backend).** `payment.service.ts` was updated to build
the URLs from a new `frontend_url` config value instead of `base_url`:

```
success_url: `${FRONTEND_URL}/payment/success?transactionId=...&session_id={CHECKOUT_SESSION_ID}`
cancel_url:  `${FRONTEND_URL}/payment/cancel?transactionId=...`
```

This needs a new `FRONTEND_URL` environment variable on the backend
deployment (e.g. `https://rentnest-frontend.vercel.app`).

**Option B — reuse an already-deployed backend with zero code changes**
(useful if that backend is a separate, already-submitted assignment you don't
want to touch). The *unmodified* backend still builds its URLs as
`${BASE_URL}/api/payments/confirm` / `${BASE_URL}/api/payments/cancel`. If you
just change the backend's `BASE_URL` environment variable (a Vercel dashboard
setting — no git push, no code change) to point at this frontend's domain
instead of the backend's own domain, Stripe will land the browser on
`https://<frontend>/api/payments/confirm?...` and `.../api/payments/cancel?...`.
This frontend has two small bridge Route Handlers
(`src/app/api/payments/confirm/route.ts`, `.../cancel/route.ts`) that simply
redirect those exact paths to the real `/payment/success` and
`/payment/cancel` pages, preserving all query params. The `/payment/success`
page then calls `GET {API}/payments/confirm` itself to finalize the payment.

Either option, the `/payment/success` page then calls `GET {API}/payments/confirm?transactionId=&session_id=`
(client-side, unauthenticated — this route has no `auth()` middleware on the
backend) to finalize the payment and display the result.

## Known simplifications

- No refresh-token flow is wired up on the frontend; the access token
  (1-day expiry, matching `JWT_ACCESS_EXPIRES_IN`) is stored in a
  frontend-domain cookie and the user is redirected to `/auth/login` once it
  expires. This sidesteps cross-site refresh-cookie issues between two
  separately-deployed Vercel apps.
- The tenant dashboard does not hide "Leave review" after a review has already
  been submitted (the `GET /rentals` response doesn't currently include review
  status) — resubmitting shows a normal validation error toast from the
  backend's unique constraint on `rentalRequestId`.
