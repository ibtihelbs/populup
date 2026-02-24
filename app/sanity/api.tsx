// sanity/api.ts
import { sanityClient } from "./sanityConfig";
import { FONTS_QUERY } from "./sanityConfig";

type ApiParams = {
  query: string;
  params?: Record<string, any>;
  revalidate?: number;
};

export async function api<T>({
  query,
  params = {},
  revalidate,
}: ApiParams): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: revalidate ? { revalidate } : undefined,
  });
}

// ---- Fonts helpers ----
export type SanityFont = {
  fontFamily?: string;
  usage?: string; // heading, body, accent, etc
};

export function formatFontName(fonts: SanityFont[]) {
  return fonts
    .map((font) => {
      const raw = font.fontFamily?.split(",")[0] ?? "";
      const name = raw.replace(/['"]/g, "").replace(/\s+/g, "_");

      return {
        usage: font.usage ?? "default",
        name,
      };
    })
    .filter((f) => f.name); // remove empty
}

export async function getFormattedFonts(revalidate?: number) {
  const fonts = await api<SanityFont[]>({
    query: FONTS_QUERY,
    revalidate,
  });

  console.log("Sanity fonts:", fonts);

  const formatted = formatFontName(fonts);

  // dedupe by name
  return Object.values(Object.fromEntries(formatted.map((f) => [f.name, f])));
}
