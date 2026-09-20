import Image from "next/image";

import { LOGO_RATIO, logoFor } from "@/lib/logos";

export type LogoSize = "sm" | "md" | "lg";

/** Tile heights per size; widths follow the shared 3:1 logo canvas. */
const HEIGHTS: Record<LogoSize, number> = { sm: 30, md: 36, lg: 48 };

interface OperatorLogoProps {
  /** Operator id, matching a key in the logo registry. */
  id?: string;
  /** Accessible name, and the source of the fallback text. */
  name: string;
  size?: LogoSize;
  /** Brand colour used for the fallback tile when no logo exists. */
  color?: string;
  /** Short label for the fallback tile; defaults to the name. */
  fallback?: string;
  dim?: boolean;
  className?: string;
}

/**
 * Fixed-size brand tile for an operator.
 *
 * Every logo has been normalized onto the same 3:1 canvas, so each tile is the
 * same box regardless of how wide the original wordmark was — the marks line up
 * across pills, table rows and cards without any per-operator tweaking.
 */
export default function OperatorLogo({
  id,
  name,
  size = "md",
  color,
  fallback,
  dim = false,
  className = "",
}: OperatorLogoProps) {
  const height = HEIGHTS[size];
  const width = Math.round(height * LOGO_RATIO);
  const logo = id ? logoFor(id) : undefined;

  const box =
    "flex flex-none items-center justify-center overflow-hidden rounded-[7px]";

  if (!logo) {
    return (
      <span
        className={`${box} px-2 font-display font-bold uppercase tracking-[.4px] text-white ${className}`}
        style={{
          width,
          height,
          fontSize: size === "lg" ? 15 : size === "md" ? 12.5 : 11,
          background: color ?? "#4f46e5",
          opacity: dim ? 0.75 : 1,
        }}
        aria-label={name}
        role="img"
      >
        {fallback ?? name}
      </span>
    );
  }

  return (
    <span
      className={`${box} border border-line bg-logoTile ${className}`}
      style={{ width, height, opacity: dim ? 0.8 : 1 }}
    >
      <Image
        src={logo}
        alt={name}
        width={width}
        height={height}
        className="h-full w-full object-contain"
        priority={size === "lg"}
      />
    </span>
  );
}
