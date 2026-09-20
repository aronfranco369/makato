import { selectRows } from "./supabase";
import type {
  Band,
  Catalog,
  Coverage,
  Operator,
  ProviderKind,
  Service,
  TariffTable,
} from "./types";

/** Services the comparison screen needs; the rest of the catalog is ignored. */
export const SERVICES: Service[] = [
  "cashout_agent",
  "send_onnet",
  "send_offnet",
  "send_bank",
  "merchant",
];

interface ProviderRow {
  slug: string;
  name: string;
  operator: string;
  brand_tint: string;
  kind: ProviderKind;
  coverage: Coverage;
}

interface TariffRow {
  provider_slug: string;
  service: Service;
  amount_from: number;
  amount_to: number | null;
  fee_minor: number | null;
  levy_minor: number;
  total_minor: number | null;
}

interface MetaRow {
  revision: number;
  published_at: string | null;
}

/**
 * Loads the published catalog.
 *
 * Wallets and fintech accounts are the things you send *from*, so those are the
 * operators; banks stay in the catalog as a destination only. Tariff rows come
 * down whole because the screen re-prices every operator on every keystroke —
 * a round trip per band lookup would be far more traffic than the table itself.
 */
export async function loadCatalog(): Promise<Catalog> {
  const [providers, rows, meta] = await Promise.all([
    selectRows<ProviderRow>(
      "providers",
      "select=slug,name,operator,brand_tint,kind,coverage&is_active=eq.true&kind=in.(wallet,fintech)&order=sort_order.asc"
    ),
    selectRows<TariffRow>(
      "tariffs",
      "select=provider_slug,service,amount_from,amount_to,fee_minor,levy_minor,total_minor" +
        `&is_current=eq.true&service=in.(${SERVICES.join(",")})` +
        "&order=provider_slug.asc,service.asc,amount_from.asc&limit=5000"
    ),
    selectRows<MetaRow>("catalog_meta", "select=revision,published_at&id=eq.1"),
  ]);

  const operators: Operator[] = providers.map((p) => ({
    id: p.slug,
    name: p.name,
    network: p.operator,
    color: p.brand_tint,
    kind: p.kind,
    coverage: p.coverage,
  }));

  const known = new Set(operators.map((o) => o.id));
  const tariffs: TariffTable = {};
  let maxAmount = 0;

  for (const r of rows) {
    if (!known.has(r.provider_slug)) continue;

    const band: Band = {
      from: r.amount_from,
      to: r.amount_to,
      fee: r.fee_minor,
      levy: r.levy_minor,
      total: r.total_minor,
    };

    const forProvider = (tariffs[r.provider_slug] ??= {});
    (forProvider[r.service] ??= []).push(band);

    if (r.amount_to !== null && r.amount_to > maxAmount) maxAmount = r.amount_to;
  }

  return {
    operators,
    tariffs,
    maxAmount,
    revision: meta[0]?.revision ?? 0,
    publishedAt: meta[0]?.published_at ?? null,
  };
}
