import type { Translate } from "./i18n";
import type {
  Catalog,
  Charge,
  Destination,
  DestinationMeta,
  Mode,
  Operator,
  OperatorCharge,
  Service,
  TariffTable,
} from "./types";

/** Which published tariff table prices this route, or null if there is none. */
export function serviceFor(
  mode: Mode,
  destination: Destination,
  operatorId: string
): Service | null {
  if (mode === "withdraw") return "cashout_agent";
  if (destination === "") return null;
  if (destination === "bank") return "send_bank";
  if (destination === "merchant") return "merchant";
  return destination === operatorId ? "send_onnet" : "send_offnet";
}

/**
 * The charge one operator publishes for one amount.
 *
 * Returns null whenever the catalog cannot answer — no table for the service,
 * no band covering the amount, or a band whose fee the source never printed.
 * That gap is shown as "no published tariff" rather than guessed at.
 */
export function chargeFor(
  tariffs: TariffTable,
  operatorId: string,
  service: Service | null,
  amount: number
): Charge | null {
  if (!service || amount <= 0) return null;

  const bands = tariffs[operatorId]?.[service];
  if (!bands) return null;

  const band = bands.find(
    (b) => amount >= b.from && (b.to === null || amount <= b.to)
  );
  if (!band || band.fee === null) return null;

  return {
    fee: band.fee,
    levy: band.levy,
    total: band.total ?? band.fee + band.levy,
  };
}

export function chargeAllOperators(
  catalog: Catalog,
  amount: number,
  mode: Mode,
  destination: Destination
): OperatorCharge[] {
  return catalog.operators.map((op) => ({
    ...op,
    charge: chargeFor(
      catalog.tariffs,
      op.id,
      serviceFor(mode, destination, op.id),
      amount
    ),
  }));
}

/** Priced operators cheapest first, with the unpublished ones last. */
export function sortByTotal(rows: OperatorCharge[]): OperatorCharge[] {
  return [...rows].sort((a, b) => {
    if (!a.charge) return b.charge ? 1 : 0;
    if (!b.charge) return -1;
    return a.charge.total - b.charge.total;
  });
}

export function money(n: number): string {
  return `TZS ${Math.round(n).toLocaleString("en-US")}`;
}

export function plain(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/** Display details for the chosen destination, in the active language. */
export function destinationMeta(
  operators: Operator[],
  destination: Destination,
  operatorId: string,
  t: Translate
): DestinationMeta | null {
  if (destination === "bank")
    return {
      name: t("bankAccount"),
      hint: t("walletToBank"),
      color: "#4f46e5",
      fallback: "Bank",
    };
  if (destination === "merchant")
    return {
      name: t("lipaNamba"),
      hint: t("merchantRoute"),
      color: "#4f46e5",
      fallback: "Lipa",
    };

  const op = operators.find((o) => o.id === destination);
  if (!op) return null;

  return {
    id: op.id,
    name: op.name,
    hint: t(destination === operatorId ? "sameNetwork" : "crossNetwork"),
    color: op.color,
    fallback: op.name,
  };
}
