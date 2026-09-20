"use client";

import { useMemo, useState } from "react";

import AmountCard from "@/components/AmountCard";
import Header from "@/components/Header";
import { useI18n } from "@/components/LanguageProvider";
import ModeToggle from "@/components/ModeToggle";
import OperatorPills from "@/components/OperatorPills";
import OperatorTable from "@/components/OperatorTable";
import RouteCard from "@/components/RouteCard";
import SummaryCard from "@/components/SummaryCard";
import { chargeAllOperators, destinationMeta, money, sortByTotal } from "@/lib/charges";
import { DEFAULT_AMOUNT, DEFAULT_MODE } from "@/lib/config";
import type { Catalog, Destination, Mode } from "@/lib/types";

interface ChargeExplorerProps {
  catalog: Catalog;
}

/** The whole comparison screen, priced from the catalog the server loaded. */
export default function ChargeExplorer({ catalog }: ChargeExplorerProps) {
  const { t } = useI18n();
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [mode, setMode] = useState<Mode>(DEFAULT_MODE);
  const [operatorId, setOperatorId] = useState<string>(catalog.operators[0]?.id ?? "");
  const [destination, setDestination] = useState<Destination>("");

  const isWithdraw = mode === "withdraw";
  const hasDestination = !isWithdraw && destination !== "";
  const showResults = isWithdraw || hasDestination;

  const { active, sorted, cheapest } = useMemo(() => {
    const priced = chargeAllOperators(catalog, amount, mode, destination);
    const bySorted = sortByTotal(priced);
    return {
      active: priced.find((o) => o.id === operatorId) ?? priced[0],
      sorted: bySorted,
      cheapest: bySorted.find((o) => o.charge) ?? null,
    };
  }, [catalog, amount, mode, destination, operatorId]);

  const dest = destinationMeta(catalog.operators, destination, operatorId, t);
  const savings =
    active?.charge && cheapest?.charge
      ? active.charge.total - cheapest.charge.total
      : 0;

  const verdict = !active
    ? ""
    : !active.charge
      ? t("verdictNoData", { name: active.name })
      : active.charge.total === 0
        ? t("verdictFree", { name: active.name })
        : savings > 0 && cheapest
          ? t("verdictSwitch", {
              name: cheapest.name,
              amount: money(savings),
            })
          : t(isWithdraw ? "verdictCheapestWithdraw" : "verdictCheapestSend", {
              name: active.name,
            });

  return (
    <main className="box-border flex min-h-screen flex-col items-center gap-5 bg-canvas px-4 pb-12 pt-6 sm:gap-6 sm:px-6 sm:pb-[72px] sm:pt-10">
      <Header />

      <div className="flex w-full max-w-[640px] flex-col items-center gap-4 text-center sm:gap-[22px]">
        <AmountCard
          amount={amount}
          onAmountChange={setAmount}
          maxAmount={catalog.maxAmount}
        />

        <ModeToggle mode={mode} onModeChange={setMode} />
      </div>

      {isWithdraw ? (
        <OperatorPills
          operators={catalog.operators}
          operatorId={operatorId}
          onOperatorChange={setOperatorId}
        />
      ) : (
        <RouteCard
          operators={catalog.operators}
          operatorId={operatorId}
          destination={destination}
          onOperatorChange={setOperatorId}
          onDestinationChange={setDestination}
        />
      )}

      {!isWithdraw && !hasDestination && (
        <div className="w-full max-w-[760px] pb-1 pt-3 text-center text-sm font-semibold text-hint sm:pt-[18px]">
          {t("pickDestination")}
        </div>
      )}

      {showResults && active && (
        <div className="flex w-full max-w-[1080px] flex-col items-stretch gap-5">
          <SummaryCard
            active={active}
            amount={amount}
            routeLabel={
              isWithdraw
                ? t("withdrawing")
                : t("sendingToRoute", { name: dest ? dest.name : "" })
            }
            receiveLabel={t(isWithdraw ? "needInBalance" : "payInTotal")}
            verdict={verdict}
          />

          <OperatorTable
            rows={sorted}
            cheapestTotal={cheapest?.charge?.total ?? null}
            hint={t(isWithdraw ? "cheapestFirst" : "sameDestinationCheapestFirst")}
            revision={catalog.revision}
          />
        </div>
      )}
    </main>
  );
}
