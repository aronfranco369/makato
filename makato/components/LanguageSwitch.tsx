"use client";

import { useI18n } from "./LanguageProvider";
import { LANGS, LANG_LABEL } from "@/lib/i18n";

/**
 * ENG / SWA segmented switch, built as a compact echo of the withdraw/send
 * toggle so the two switches in the header read as the same control family.
 */
export default function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("languageToggle")}
      className="relative grid grid-cols-2 rounded-full bg-chip2 p-[3px]"
    >
      <div
        aria-hidden
        className="absolute left-[3px] top-[3px] h-[calc(100%-6px)] w-[calc(50%-3px)] rounded-full bg-surface shadow-thumb"
        style={{
          transition: "transform .32s cubic-bezier(.4,1.2,.4,1)",
          transform: lang === "en" ? "translateX(0%)" : "translateX(100%)",
        }}
      />
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`relative z-10 rounded-full px-[11px] py-[6px] text-[12px] font-bold tracking-[.4px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            lang === code ? "text-ink" : "text-subtle"
          }`}
        >
          {LANG_LABEL[code]}
        </button>
      ))}
    </div>
  );
}
