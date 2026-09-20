"use client";

import { useI18n } from "./LanguageProvider";
import OperatorLogo from "./OperatorLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { destinationMeta } from "@/lib/charges";
import type { Destination, DestinationOption, Operator } from "@/lib/types";

interface RouteCardProps {
  operators: Operator[];
  operatorId: string;
  destination: Destination;
  onOperatorChange: (id: string) => void;
  onDestinationChange: (destination: Destination) => void;
}

const NO_DESTINATION = "__none__";

/** "Sending from → Sending to" picker shown in send mode. */
export default function RouteCard({
  operators,
  operatorId,
  destination,
  onOperatorChange,
  onDestinationChange,
}: RouteCardProps) {
  const { t } = useI18n();
  const active = operators.find((o) => o.id === operatorId) ?? operators[0];
  const dest = destinationMeta(operators, destination, operatorId, t);

  const destinationOptions: DestinationOption[] = [
    { value: "", labelKey: "selectDestination" },
    ...operators.map((o) => ({ value: o.id as Destination, label: o.name })),
    { value: "bank", labelKey: "bankAccount" },
    { value: "merchant", labelKey: "lipaNambaOption" },
  ];

  return (
    <Card className="w-full max-w-[760px]">
      <CardContent className="grid grid-cols-1 items-center gap-3 px-4 py-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-[14px] sm:px-6 sm:py-[22px]">
        <div className="min-w-0">
          <Label className="mb-[7px] block">{t("sendingFrom")}</Label>
          <Select value={operatorId} onValueChange={onOperatorChange}>
            <SelectTrigger
              hideIcon
              aria-label={t("sendingFrom")}
              className="h-auto rounded-[18px] border-[1.5px] border-fieldline bg-field py-[11px] pl-3 pr-[14px]"
            >
              <span className="flex min-w-0 flex-1 items-center gap-[10px]">
                <OperatorLogo id={active.id} name={active.name} />
                <span className="min-w-0 flex-1 text-left">
                  <span className="block truncate font-display text-[15px] font-bold text-ink">
                    {active.name}
                  </span>
                  <span className="block text-[11.5px] font-semibold text-faint">
                    {active.network}
                  </span>
                </span>
              </span>
              <span className="text-[12px] text-faint">▾</span>
            </SelectTrigger>
            <SelectContent>
              {operators.map((o) => (
                <SelectItem key={o.id} value={o.id}>
                  {o.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mx-auto flex h-[38px] w-[38px] rotate-90 items-center justify-center rounded-full bg-brandSoft text-[17px] font-bold text-brandText sm:mt-[22px] sm:rotate-0">
          →
        </div>

        <div className="min-w-0">
          <Label className="mb-[7px] block">{t("sendingTo")}</Label>
          <Select
            value={destination === "" ? NO_DESTINATION : destination}
            onValueChange={(v) =>
              onDestinationChange((v === NO_DESTINATION ? "" : v) as Destination)
            }
          >
            <SelectTrigger
              hideIcon
              aria-label={t("sendingTo")}
              className={
                dest
                  ? "h-auto rounded-[18px] border-[1.5px] border-brandLine bg-brandSoft2 py-[11px] pl-3 pr-[14px]"
                  : "h-auto rounded-[18px] border-[1.5px] border-dashed border-dash bg-dashBg py-[11px] pl-3 pr-[14px]"
              }
            >
              <span className="flex min-w-0 flex-1 items-center gap-[10px]">
                {dest ? (
                  <OperatorLogo
                    id={dest.id}
                    name={dest.name}
                    color={dest.color}
                    fallback={dest.fallback}
                  />
                ) : (
                  <span className="flex h-[36px] w-[108px] flex-none items-center justify-center rounded-[7px] border border-dashed border-fieldline bg-chip font-display text-[15px] font-bold text-faint">
                    ?
                  </span>
                )}
                <span className="min-w-0 flex-1 text-left">
                  <span
                    className={`block truncate font-display text-[15px] font-bold ${
                      dest ? "text-ink" : "text-faint"
                    }`}
                  >
                    {dest ? dest.name : t("chooseDestination")}
                  </span>
                  <span
                    className={`block text-[11.5px] font-semibold ${
                      dest ? "text-brandText" : "text-ghost"
                    }`}
                  >
                    {dest ? dest.hint : t("destinationHint")}
                  </span>
                </span>
              </span>
              <span className={`text-[12px] ${dest ? "text-brandText" : "text-faint"}`}>▾</span>
            </SelectTrigger>
            <SelectContent>
              {destinationOptions.map((o) => (
                <SelectItem
                  key={o.value || NO_DESTINATION}
                  value={o.value === "" ? NO_DESTINATION : o.value}
                >
                  {"label" in o ? o.label : t(o.labelKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
