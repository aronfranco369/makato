import type { Mode, Preset } from "./types";

/** Amount shortcuts on the keypad card — UI convenience, not tariff data. */
export const PRESETS: Preset[] = [10000, 50000, 100000, 500000, 1000000].map(
  (value) => ({
    label: value >= 1000000 ? `${value / 1000000}M` : `${value / 1000}K`,
    value,
  })
);

export const DEFAULT_AMOUNT = 100000;
export const DEFAULT_MODE: Mode = "withdraw";
