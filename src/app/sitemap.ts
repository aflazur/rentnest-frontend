import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    return [
        { url: `${base}/`, changeFrequency: "daily", priority: 1 },
        { url: `${base}/properties`, changeFrequency: "hourly", priority: 0.9 },
        { url: `${base}/auth/login`, changeFrequency: "yearly", priority: 0.3 },
        { url: `${base}/auth/register`, changeFrequency: "yearly", priority: 0.3 },
    ];
}