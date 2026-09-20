"use client";

import { useI18n } from "./LanguageProvider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Mode } from "@/lib/types";

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

/** Sliding pill switch between withdraw and send, built on the shadcn Tabs primitive. */
export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  const { t } = useI18n();
  const isWithdraw = mode === "withdraw";

  return (
    <Tabs
      value={mode}
      onValueChange={(v) => onModeChange(v as Mode)}
      className="w-full max-w-[320px]"
    >
      <TabsList className="relative grid w-full grid-cols-2 rounded-full bg-chip2 p-[5px]">
        <div
          aria-hidden
          className="absolute left-[5px] top-[5px] h-[calc(100%-10px)] w-[calc(50%-5px)] rounded-full bg-surface shadow-thumb"
          style={{
            transition: "transform .32s cubic-bezier(.4,1.2,.4,1)",
            transform: isWithdraw ? "translateX(0%)" : "translateX(100%)",
          }}
        />
        <TabsTrigger
          value="withdraw"
          className="relative z-10 rounded-full bg-transparent py-[11px] text-[14.5px] font-bold text-subtle transition-colors duration-200 data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none"
        >
          {t("withdraw")}
        </TabsTrigger>
        <TabsTrigger
          value="send"
          className="relative z-10 rounded-full bg-transparent py-[11px] text-[14.5px] font-bold text-subtle transition-colors duration-200 data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none"
        >
          {t("send")}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
