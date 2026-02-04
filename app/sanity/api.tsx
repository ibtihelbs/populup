// sanity/api.ts
import { sanityClient } from "./sanityConfig";

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
