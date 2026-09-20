"use client";

import { useI18n } from "./LanguageProvider";
import OperatorLogo from "./OperatorLogo";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { money } from "@/lib/charges";
import type { OperatorCharge } from "@/lib/types";

interface SummaryCardProps {
  active: OperatorCharge;
  amount: number;
  routeLabel: string;
  receiveLabel: string;
  verdict: string;
}

/** Headline card: the selected operator's charge broken down. */
export default function SummaryCard({
  active,
  amount,
  routeLabel,
  receiveLabel,
  verdict,
}: SummaryCardProps) {
  const { t } = useI18n();
  const charge = active.charge;
  const rate =
    charge && amount ? `${((charge.total / amount) * 100).toFixed(2)}%` : "—";

  return (
    <Card className="rounded-[22px]">
      <CardContent className="flex flex-wrap items-center gap-x-5 gap-y-4 px-4 py-4 sm:gap-x-[26px] sm:gap-y-[18px] sm:px-[22px] sm:py-[18px]">
        <div className="flex w-full min-w-0 items-center gap-[10px] sm:w-auto sm:min-w-[170px]">
          <OperatorLogo id={active.id} name={active.name} color={active.color} size="lg" />
          <div>
            <div className="font-display text-[16px] font-bold text-ink">{active.name}</div>
            <div className="text-[11.5px] font-bold uppercase tracking-[.8px] text-faint">
              {routeLabel}
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 basis-full flex-wrap items-center gap-4 sm:basis-[380px] sm:gap-[22px]">
          <div>
            <div className="text-[11.5px] font-bold uppercase tracking-[.8px] text-faint">
              {t("totalCharge")}
            </div>
            <div className="font-display text-[26px] font-bold leading-[1.2] tracking-[-1px] text-ink">
              {charge ? (charge.total === 0 ? t("free") : money(charge.total)) : "—"}
            </div>
          </div>

          <Separator orientation="vertical" className="hidden sm:block" />

          {charge ? (
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-[13px] font-semibold text-slate4 sm:gap-[22px]">
              <div>
                <div>{t("charge")}</div>
                <div className="font-display text-[15px] text-ink">{money(charge.fee)}</div>
              </div>
              <div>
                <div>{t("levy")}</div>
                <div className="font-display text-[15px] text-ink">{money(charge.levy)}</div>
              </div>
              <div>
                <div>{t("rate")}</div>
                <div className="font-display text-[15px] text-ink">{rate}</div>
              </div>
              <div>
                <div>{receiveLabel}</div>
                <div className="font-display text-[15px] text-ink">
                  {money(amount + charge.total)}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-[13px] font-semibold text-slate4">{t("noTariff")}</div>
          )}
        </div>

        <Badge
          variant="soft"
          className="min-w-0 flex-1 basis-full justify-start rounded-[14px] px-[14px] py-[10px] text-[12.5px] font-semibold leading-[1.45] sm:basis-[240px]"
        >
          {verdict}
        </Badge>
      </CardContent>
    </Card>
  );
}
