"use client";

import OperatorLogo from "./OperatorLogo";
import { Button } from "@/components/ui/button";
import type { Operator } from "@/lib/types";

interface OperatorPillsProps {
  operators: Operator[];
  operatorId: string;
  onOperatorChange: (id: string) => void;
}

/** Logo-only chips — every operator mark is a wordmark, so no text label is needed. */
export default function OperatorPills({
  operators,
  operatorId,
  onOperatorChange,
}: OperatorPillsProps) {
  return (
    <div className="flex w-full max-w-[1080px] flex-wrap justify-center gap-2 sm:gap-[10px]">
      {operators.map((op) => {
        const selected = op.id === operatorId;
        return (
          <Button
            key={op.id}
            variant={selected ? "pillActive" : "pill"}
            size="pill"
            aria-pressed={selected}
            aria-label={op.name}
            onClick={() => onOperatorChange(op.id)}
            className="pr-3"
          >
            <OperatorLogo
              id={op.id}
              name={op.name}
              color={op.color}
              size="sm"
              dim={!selected}
            />
          </Button>
        );
      })}
    </div>
  );
}
