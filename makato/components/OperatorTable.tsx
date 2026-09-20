"use client";

import { useI18n } from "./LanguageProvider";
import OperatorLogo from "./OperatorLogo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { plain } from "@/lib/charges";
import type { OperatorCharge } from "@/lib/types";

interface OperatorTableProps {
  rows: OperatorCharge[];
  /** cheapest published total, or null when nobody publishes this route */
  cheapestTotal: number | null;
  hint: string;
  revision: number;
}

export default function OperatorTable({
  rows,
  cheapestTotal,
  hint,
  revision,
}: OperatorTableProps) {
  const { t } = useI18n();

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-baseline justify-between gap-x-3 gap-y-1 px-4 pb-[6px] pt-6 sm:px-7 sm:pt-[26px]">
        <CardTitle>{t("allOperators")}</CardTitle>
        <CardDescription>{hint}</CardDescription>
      </CardHeader>

      <CardContent className="px-4 pb-5 sm:px-7">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-line">
              <TableHead className="w-auto sm:w-[40%]">{t("operator")}</TableHead>
              <TableHead className="hidden whitespace-nowrap text-right sm:table-cell">
                {t("charge")}
              </TableHead>
              <TableHead className="hidden whitespace-nowrap text-right sm:table-cell">
                {t("levy")}
              </TableHead>
              <TableHead className="whitespace-nowrap text-right">{t("total")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((r) => {
              const charge = r.charge;
              const cheapest = charge !== null && charge.total === cheapestTotal;
              return (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="flex min-w-0 items-center gap-[10px]">
                      <OperatorLogo id={r.id} name={r.name} color={r.color} />
                      <div className="min-w-0">
                        <div className="hidden truncate text-[14px] font-bold text-ink sm:block">
                          {r.name}
                        </div>
                        <div
                          className={`text-[11.5px] font-semibold ${
                            cheapest ? "text-good" : "text-faint"
                          }`}
                        >
                          {!charge
                            ? t("noTariff")
                            : cheapest
                              ? t("cheapest")
                              : t("moreThanCheapest", {
                                  amount: plain(charge.total - (cheapestTotal ?? 0)),
                                })}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden whitespace-nowrap text-right font-display text-[14px] text-slate2 sm:table-cell">
                    {charge ? plain(charge.fee) : "—"}
                  </TableCell>
                  <TableCell className="hidden whitespace-nowrap text-right font-display text-[14px] text-slate2 sm:table-cell">
                    {charge ? plain(charge.levy) : "—"}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right font-display text-[15px] font-bold text-ink">
                    {charge ? (charge.total === 0 ? t("free") : plain(charge.total)) : "—"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          <TableCaption>
            {t("tableCaption")} {t("catalogRevision", { revision })}
          </TableCaption>
        </Table>
      </CardContent>
    </Card>
  );
}
