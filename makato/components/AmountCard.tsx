"use client";

import { useI18n } from "./LanguageProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PRESETS } from "@/lib/config";

interface AmountCardProps {
  amount: number;
  onAmountChange: (amount: number) => void;
  /** largest amount the published bands cover */
  maxAmount: number;
}

export default function AmountCard({
  amount,
  onAmountChange,
  maxAmount,
}: AmountCardProps) {
  const { t } = useI18n();

  const handleInput = (raw: string) => {
    const v = parseInt(raw.replace(/[^0-9]/g, ""), 10);
    onAmountChange(isNaN(v) ? 0 : Math.min(v, maxAmount));
  };

  return (
    <Card className="w-full">
      <CardContent className="px-4 pb-6 pt-6 sm:px-8 sm:pb-[26px] sm:pt-7">
        <div className="flex items-baseline justify-center gap-2 sm:gap-[10px]">
          <span className="font-display text-[20px] font-medium text-faint sm:text-[26px]">
            TZS
          </span>
          <Input
            value={amount ? amount.toLocaleString("en-US") : ""}
            onChange={(e) => handleInput(e.target.value)}
            inputMode="numeric"
            aria-label={t("amountLabel")}
            className="h-auto w-[min(380px,75%)] border-none bg-transparent p-0 text-center font-display text-[38px] font-bold tracking-[-1px] text-ink focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-[52px] sm:tracking-[-1.5px]"
          />
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-5">
          {PRESETS.map((p) => (
            <Button
              key={p.value}
              variant="preset"
              size="preset"
              onClick={() => onAmountChange(p.value)}
            >
              {p.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
