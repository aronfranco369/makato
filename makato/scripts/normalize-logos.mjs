/**
 * Normalizes the raw provider logos in /logos into one uniform canvas in
 * /public/logos so every operator mark occupies the same box in the UI.
 *
 * The sources are wordmarks on wildly different canvases (1:1 to 4.2:1) with
 * different amounts of baked-in whitespace, so each file is auto-trimmed to its
 * artwork before being letterboxed into the shared 3:1 canvas.
 *
 *   npm run logos
 */
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.join(process.cwd(), "logos");
const OUT = path.join(process.cwd(), "public", "logos");

/** Shared canvas: 3:1, generous enough to stay crisp on retina at 2x. */
const CANVAS = { width: 600, height: 200 };
/**
 * Breathing room kept inside the canvas so marks never touch the tile edge.
 * Deliberately tight: the tiles are small on screen, so every pixel of padding
 * is a pixel the wordmark does not get.
 */
const PAD = { x: 6, y: 4 };

/** Raw filename (as downloaded) -> provider slug in the catalog. */
const SOURCES = {
  "mpesa.png": "mpesa",
  "mixx.png": "mixx",
  "Airtel-Money-Logo-PNG.png": "airtel",
  "halopesa.png": "halopesa",
  "azam pesa.png": "azampesa",
  "T- Pesa Logo PNG Vector (AI) Free Download.jpg": "tpesa",
  "selcom pesa.webp": "selcom",
};

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function normalize(file, id) {
  const src = path.join(SRC, file);
  const inner = {
    width: CANVAS.width - PAD.x * 2,
    height: CANVAS.height - PAD.y * 2,
  };

  // trim() reads the top-left pixel, so it strips a white border and a
  // transparent one alike; the threshold absorbs JPEG ringing around edges.
  const trimmed = await sharp(src)
    .ensureAlpha()
    .trim({ threshold: 12 })
    .toBuffer();

  const fitted = await sharp(trimmed)
    .resize({ ...inner, fit: "inside", withoutEnlargement: false })
    .toBuffer();

  const { width, height } = await sharp(fitted).metadata();
  const left = Math.round((CANVAS.width - width) / 2);
  const top = Math.round((CANVAS.height - height) / 2);

  const out = await sharp(fitted)
    .extend({
      left,
      top,
      right: CANVAS.width - width - left,
      bottom: CANVAS.height - height - top,
      background: TRANSPARENT,
    })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  await writeFile(path.join(OUT, `${id}.png`), out);
  return { id, file, artwork: `${width}x${height}` };
}

const present = new Set(await readdir(SRC));
const missing = Object.keys(SOURCES).filter((f) => !present.has(f));
if (missing.length) {
  console.error(`Missing source logos:\n  ${missing.join("\n  ")}`);
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
const results = await Promise.all(
  Object.entries(SOURCES).map(([file, id]) => normalize(file, id))
);

console.log(`Normalized ${results.length} logos to ${CANVAS.width}x${CANVAS.height}:`);
for (const r of results) {
  console.log(`  ${r.id.padEnd(10)} artwork ${r.artwork.padEnd(9)} <- ${r.file}`);
}
