/**
 * Localisation for the two languages the app ships in: English and Swahili.
 *
 * There is no i18n library here on purpose — the app is a single screen with a
 * couple of dozen strings, so a typed dictionary plus a `{placeholder}` swap is
 * the whole requirement. `en` is the source of truth: its keys define the
 * `Dict` type, so a missing or misspelled Swahili key is a compile error.
 */

export const LANGS = ["en", "sw"] as const;
export type Lang = (typeof LANGS)[number];

/** Label shown on the language toggle for each language. */
export const LANG_LABEL: Record<Lang, string> = { en: "ENG", sw: "SWA" };

export const STORAGE_KEY = "makato.lang";

const en = {
  brand: "Makato",
  amountLabel: "Amount in TZS",

  withdraw: "Withdraw",
  send: "Send",

  pickDestination: "Pick where the money is going to see the charges.",
  sendingFrom: "Sending from",
  sendingTo: "Sending to",
  chooseDestination: "Choose destination",
  destinationHint: "wallet, bank or Lipa Namba",
  selectDestination: "Select destination",

  bankAccount: "Bank account",
  lipaNambaOption: "Lipa Namba (merchant)",
  lipaNamba: "Lipa Namba",
  walletToBank: "Wallet to bank",
  merchantRoute: "Paying a merchant",
  sameNetwork: "Same network",
  crossNetwork: "Cross network",

  withdrawing: "Withdrawing",
  sendingToRoute: "To {name}",
  totalCharge: "Total charge",
  charge: "Charge",
  levy: "Levy",
  rate: "Rate",
  needInBalance: "You need in balance",
  payInTotal: "You pay in total",

  verdictFree: "This route is free on {name} — nothing is charged.",
  verdictNoData: "{name} has not published a tariff for this route.",
  verdictCheapestWithdraw: "{name} is the cheapest way to withdraw this amount.",
  verdictCheapestSend: "{name} is the cheapest way to send this amount.",
  verdictSwitch: "Switching to {name} saves you {amount} on this transaction.",

  allOperators: "All operators",
  cheapestFirst: "cheapest first",
  sameDestinationCheapestFirst: "same destination, cheapest first",
  operator: "Operator",
  total: "Total",
  cheapest: "Cheapest",
  moreThanCheapest: "+{amount} more",
  noTariff: "No published tariff",
  free: "Free",
  tableCaption:
    "Published operator tariffs including the government levy. Confirm with your operator before transacting.",
  catalogRevision: "Catalog revision {revision}",

  themeToLight: "Switch to light theme",
  themeToDark: "Switch to dark theme",
  languageToggle: "Switch language",
} as const;

export type Dict = typeof en;
export type StringKey = keyof Dict;

const sw: Record<StringKey, string> = {
  brand: "Makato",
  amountLabel: "Kiasi kwa TZS",

  withdraw: "Kutoa",
  send: "Kutuma",

  pickDestination: "Chagua fedha zinakwenda wapi ili kuona makato.",
  sendingFrom: "Kutoka",
  sendingTo: "Kwenda",
  chooseDestination: "Chagua unakotuma",
  destinationHint: "pochi, benki au Lipa Namba",
  selectDestination: "Chagua unakotuma",

  bankAccount: "Akaunti ya benki",
  lipaNambaOption: "Lipa Namba (mfanyabiashara)",
  lipaNamba: "Lipa Namba",
  walletToBank: "Pochi kwenda benki",
  merchantRoute: "Kulipa mfanyabiashara",
  sameNetwork: "Mtandao huo huo",
  crossNetwork: "Mtandao mwingine",

  withdrawing: "Unatoa",
  sendingToRoute: "Kwenda {name}",
  totalCharge: "Makato yote",
  charge: "Makato",
  levy: "Tozo",
  rate: "Kiwango",
  needInBalance: "Unahitaji kwenye salio",
  payInTotal: "Unalipa kwa jumla",

  verdictFree: "Njia hii ni bure kwenye {name} — hakuna makato.",
  verdictNoData: "{name} hajachapisha tozo kwa njia hii.",
  verdictCheapestWithdraw: "{name} ni njia nafuu zaidi ya kutoa kiasi hiki.",
  verdictCheapestSend: "{name} ni njia nafuu zaidi ya kutuma kiasi hiki.",
  verdictSwitch: "Kutumia {name} kunakuokoa {amount} kwenye muamala huu.",

  allOperators: "Watoa huduma wote",
  cheapestFirst: "nafuu kwanza",
  sameDestinationCheapestFirst: "lengo moja, nafuu kwanza",
  operator: "Mtoa huduma",
  total: "Jumla",
  cheapest: "Nafuu zaidi",
  moreThanCheapest: "+{amount} zaidi",
  noTariff: "Hakuna tozo iliyochapishwa",
  free: "Bure",
  tableCaption:
    "Tozo zilizochapishwa na watoa huduma pamoja na tozo ya serikali. Hakiki na mtoa huduma wako kabla ya kufanya muamala.",
  catalogRevision: "Toleo la orodha {revision}",

  themeToLight: "Badili kwenda mwangaza",
  themeToDark: "Badili kwenda giza",
  languageToggle: "Badili lugha",
};

export const DICTS: Record<Lang, Record<StringKey, string>> = { en, sw };

/** Values interpolated into a string's `{placeholder}` slots. */
export type Vars = Record<string, string | number>;

/** A bound translator; `t("verdictSwitch", { name, amount })`. */
export type Translate = (key: StringKey, vars?: Vars) => string;

export function translate(lang: Lang, key: StringKey, vars?: Vars): string {
  const raw = DICTS[lang][key] ?? DICTS.en[key] ?? key;
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match
  );
}

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGS as readonly string[]).includes(value);
}
