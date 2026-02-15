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
  fontFamily: string;
};

export function formatFontName(fonts: SanityFont[]) {
  return fonts.map((font) =>
    font.fontFamily.split(",")[0].replace(/['"]/g, "").replace(/\s+/g, "_"),
  );
}

export async function getFormattedFonts(revalidate?: number) {
  const fonts = await api<SanityFont[]>({
    query: FONTS_QUERY,
    revalidate,
  });
  return formatFontName(fonts);
}
