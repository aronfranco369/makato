import type { StringKey } from "./i18n";

export type Mode = "withdraw" | "send";

/** The tariff tables this screen compares, named as `tariffs.service` names them. */
export type Service =
  | "cashout_agent"
  | "send_onnet"
  | "send_offnet"
  | "send_bank"
  | "merchant";

export type ProviderKind = "wallet" | "bank" | "fintech";
export type Coverage = "live" | "placeholder" | "unsupported";

/** A provider available in the comparison, straight from `public.providers`. */
export interface Operator {
  /** provider slug — also the logo key */
  id: string;
  name: string;
  /** the network or institution behind the wallet */
  network: string;
  /** brand colour, used for fallback tiles and accents */
  color: string;
  kind: ProviderKind;
  coverage: Coverage;
}

/** One published amount band of one tariff table. */
export interface Band {
  from: number;
  /** open-ended band when null */
  to: number | null;
  /** null when the source does not print a fee */
  fee: number | null;
  levy: number;
  total: number | null;
}

/** Bands grouped by provider and service, ready for a band lookup. */
export type TariffTable = Record<string, Partial<Record<Service, Band[]>>>;

/** Everything the screen renders, as loaded from Supabase. */
export interface Catalog {
  operators: Operator[];
  tariffs: TariffTable;
  /** largest amount any loaded band covers */
  maxAmount: number;
  revision: number;
  publishedAt: string | null;
}

/** Where the money is going when mode is "send". */
export type Destination = "" | Operator["id"] | "bank" | "merchant";

export interface Charge {
  fee: number;
  levy: number;
  total: number;
}

/** An operator plus its charge for the current route — null when unpublished. */
export interface OperatorCharge extends Operator {
  charge: Charge | null;
}

export interface DestinationMeta {
  /** operator id when the destination is a wallet; absent for bank/merchant */
  id?: string;
  name: string;
  hint: string;
  color: string;
  /** short label shown when there is no logo to render */
  fallback: string;
}

export interface Preset {
  label: string;
  value: number;
}

/**
 * A "sending to" choice. Operator names are proper nouns and stay as they are;
 * the bank and merchant entries carry a dictionary key instead.
 */
export type DestinationOption =
  | { value: Destination; label: string }
  | { value: Destination; labelKey: StringKey };
