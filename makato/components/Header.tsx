"use client";

import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
import { useI18n } from "./LanguageProvider";

export default function Header() {
  const { t } = useI18n();

  return (
    <div className="flex w-full max-w-[1080px] items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand font-display text-[18px] font-bold text-primary-foreground">
          M
        </div>
        <div className="font-display text-[19px] font-bold tracking-[-0.2px] text-ink">
          {t("brand")}
        </div>
      </div>

      <div className="flex items-center gap-[10px]">
        <LanguageSwitch />
        <ThemeSwitch />
      </div>
    </div>
  );
}
