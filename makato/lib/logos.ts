import type { StaticImageData } from "next/image";

import airtel from "@/public/logos/airtel.png";
import azampesa from "@/public/logos/azampesa.png";
import halopesa from "@/public/logos/halopesa.png";
import mixx from "@/public/logos/mixx.png";
import mpesa from "@/public/logos/mpesa.png";
import selcom from "@/public/logos/selcom.png";
import tpesa from "@/public/logos/tpesa.png";

/**
 * Operator marks, normalized by `npm run logos` onto one 3:1 canvas.
 *
 * Importing them statically means Next reads the intrinsic width/height at
 * build time, so `next/image` always knows the real dimensions and never
 * reflows — nothing measures anything at runtime.
 */
export const LOGOS: Record<string, StaticImageData> = {
  mpesa,
  mixx,
  airtel,
  halopesa,
  azampesa,
  tpesa,
  selcom,
};

/** Aspect ratio every normalized logo canvas shares. */
export const LOGO_RATIO = 3;

export function logoFor(id: string): StaticImageData | undefined {
  return LOGOS[id];
}
