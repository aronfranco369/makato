/**
 * Minimal read-only PostgREST client for the Makato catalog.
 *
 * The catalog is public (RLS grants `anon` a SELECT on every table we touch)
 * and we only ever read, so a typed `fetch` is the whole requirement — no
 * client library, no session handling.
 */

const URL_ = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** How long a rendered catalog stays fresh before Next refetches it. */
export const CATALOG_REVALIDATE_SECONDS = 3600;

export async function selectRows<T>(table: string, query: string): Promise<T[]> {
  if (!URL_ || !KEY) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY — see .env.example"
    );
  }

  const res = await fetch(`${URL_}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      Accept: "application/json",
    },
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Supabase ${table} ${res.status}: ${await res.text()}`);
  }

  return (await res.json()) as T[];
}
