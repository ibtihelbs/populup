// app/sitemap.ts
import type { MetadataRoute } from "next";
import { api } from "./sanity/api";
import { PAST_EVENTS_QUERY } from "./sanity/sanityConfig";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://populup.vercel.app";

  // 1️⃣ Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2️⃣ Fetch dynamic events from Sanity
  const events = await api<any[]>({
    query: PAST_EVENTS_QUERY,
    revalidate: 60,
  });

  // 3️⃣ Map events to sitemap format
  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event._updatedAt), // use _updatedAt from Sanity
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 4️⃣ Combine static + dynamic pages
  return [...staticPages, ...eventPages];
}
