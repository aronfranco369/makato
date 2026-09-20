"use client";

import { Moon, Sun } from "lucide-react";

import { useI18n } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";

/** Round icon button in the header that flips the palette. */
export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t(isDark ? "themeToLight" : "themeToDark")}
      title={t(isDark ? "themeToLight" : "themeToDark")}
      className="flex h-9 w-9 flex-none items-center justify-center rounded-full border-[1.5px] border-fieldline bg-field text-slate2 transition-colors hover:border-brandLine hover:bg-brandSoft hover:text-brandText focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {isDark ? (
        <Sun className="h-[17px] w-[17px]" strokeWidth={2.4} />
      ) : (
        <Moon className="h-[17px] w-[17px]" strokeWidth={2.4} />
      )}
    </button>
  );
}
