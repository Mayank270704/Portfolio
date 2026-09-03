/**
 * The white -> near-black scroll journey.
 *
 * One value, `stage progress`, runs 0..1 across the whole document and drives
 * the entire palette.
 *
 * PACING. The stops below are spaced by perceptual lightness (CIE L*), not by
 * RGB. Spacing them evenly in RGB is what made an earlier version look broken:
 * #fcfbf8 -> #f3efe8 is a large RGB step but almost no perceived change, so the
 * first third of the page read as flat white however correct the maths was.
 * Each stop here drops L* by roughly the same amount, so every checkpoint of
 * the scroll looks meaningfully different from the last.
 *
 * L* per stop: 99 -> 91 -> 82 -> 72 -> 60 -> 50 -> 35 -> 20 -> 4
 *
 * CONTRAST. A ground travelling white to black passes through mid-grey, and
 * mid-grey is where a fixed text colour dies. So the foreground is not fixed:
 * it is interpolated alongside the ground and squeezed towards pure black
 * (light half) or pure white (dark half) as the ground approaches the middle.
 * The type hierarchy compresses through the crossover and re-opens after.
 *
 * The crossover ground (#767470, relative luminance 0.175) is picked so both
 * palettes clear AA against it: pure black gives 4.50:1, pure white 4.67:1.
 * The switch is instantaneous rather than interpolated — fading text from
 * black to white would take it through grey at the exact moment the ground is
 * grey, and it would disappear.
 */

export type StagePalette = {
  ground: string;
  fg: string;
  fgMuted: string;
  fgSubtle: string;
  accent: string;
  accentBright: string;
  /**
   * Signed tint for surfaces and borders, applied over the ground.
   * Positive lightens (white alpha), negative darkens (black alpha).
   *
   * The sign has to flip through the journey. A card must push away from the
   * text sitting on it: while the text is near-black the card lightens, and
   * the moment the palette flips to near-white text the card darkens. Getting
   * this backwards is what quietly erodes contrast in the middle, where there
   * is least headroom to spare.
   */
  surface: number;
  raised: number;
  line: number;
  lineStrong: number;
};

type Stop = { at: number } & StagePalette;

/** Where the palette flips. The ground is continuous across it; nothing else is. */
export const STAGE_FLIP = 0.58;

/** white -> warm white -> off-white -> light grey -> medium grey. */
const LIGHT_STOPS: Stop[] = [
  {
    at: 0,
    ground: "#fdfcfa",
    fg: "#14171c",
    fgMuted: "#4d545e",
    fgSubtle: "#6b727c",
    accent: "#2c46cf",
    accentBright: "#1b32ad",
    surface: -0.035,
    raised: -0.07,
    line: -0.12,
    lineStrong: -0.24,
  },
  {
    at: 0.12,
    ground: "#e8e4db",
    fg: "#101319",
    fgMuted: "#414751",
    fgSubtle: "#5d646e",
    accent: "#2a43c4",
    accentBright: "#182da0",
    surface: -0.028,
    raised: -0.055,
    line: -0.13,
    lineStrong: -0.25,
  },
  {
    at: 0.25,
    ground: "#cfcac0",
    fg: "#0a0c10",
    fgMuted: "#32373f",
    fgSubtle: "#4e545d",
    accent: "#233aad",
    accentBright: "#152581",
    surface: 0.03,
    raised: 0.07,
    line: -0.16,
    lineStrong: -0.3,
  },
  {
    at: 0.38,
    ground: "#b2ada3",
    fg: "#05070a",
    fgMuted: "#23272d",
    fgSubtle: "#3a3f47",
    accent: "#1a2b85",
    accentBright: "#0f1a5c",
    surface: 0.08,
    raised: 0.15,
    line: -0.2,
    lineStrong: -0.38,
  },
  {
    at: 0.5,
    ground: "#929088",
    fg: "#000000",
    fgMuted: "#131519",
    fgSubtle: "#1f2228",
    accent: "#101a4d",
    accentBright: "#080e2c",
    surface: 0.16,
    raised: 0.26,
    line: -0.28,
    lineStrong: -0.5,
  },
  {
    at: STAGE_FLIP,
    ground: "#767470",
    fg: "#000000",
    fgMuted: "#000000",
    fgSubtle: "#000000",
    accent: "#000000",
    accentBright: "#000000",
    surface: 0.22,
    raised: 0.34,
    line: -0.34,
    lineStrong: -0.6,
  },
];

/** medium grey -> charcoal -> near-black. */
const DARK_STOPS: Stop[] = [
  {
    at: STAGE_FLIP,
    ground: "#767470",
    fg: "#ffffff",
    fgMuted: "#ffffff",
    fgSubtle: "#ffffff",
    accent: "#ffffff",
    accentBright: "#ffffff",
    surface: -0.22,
    raised: -0.34,
    line: 0.44,
    lineStrong: 0.7,
  },
  {
    at: 0.66,
    ground: "#5e6169",
    fg: "#ffffff",
    fgMuted: "#eef1f5",
    fgSubtle: "#dfe3ea",
    accent: "#e3e9ff",
    accentBright: "#ffffff",
    surface: -0.18,
    raised: -0.28,
    line: 0.34,
    lineStrong: 0.58,
  },
  {
    at: 0.74,
    ground: "#4f535a",
    fg: "#f8fafc",
    fgMuted: "#dee3ea",
    fgSubtle: "#c3cad4",
    accent: "#c9d6ff",
    accentBright: "#e6ecff",
    surface: -0.14,
    raised: -0.22,
    line: 0.28,
    lineStrong: 0.5,
  },
  {
    at: 0.87,
    ground: "#2b2f37",
    fg: "#f5f7fa",
    fgMuted: "#bdc5d0",
    fgSubtle: "#9aa4b1",
    accent: "#9fb5ff",
    accentBright: "#c6d3ff",
    surface: 0,
    raised: 0.03,
    line: 0.17,
    lineStrong: 0.34,
  },
  {
    at: 1,
    ground: "#0a0c11",
    fg: "#f4f6fa",
    fgMuted: "#a5aeba",
    fgSubtle: "#79828f",
    accent: "#8fa8ff",
    accentBright: "#b6c6ff",
    surface: 0.045,
    raised: 0.08,
    line: 0.12,
    lineStrong: 0.26,
  },
];

function parseHex(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16),
  ];
}

function mixHex(a: string, b: string, t: number): string {
  const [r1, g1, b1] = parseHex(a);
  const [r2, g2, b2] = parseHex(b);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${mix(r1, r2)} ${mix(g1, g2)} ${mix(b1, b2)})`;
}

function mixNumber(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function stageFor(progress: number): "light" | "dark" {
  return progress >= STAGE_FLIP ? "dark" : "light";
}

/** The full palette at a given stage progress. */
export function paletteAt(progress: number): StagePalette & { stage: "light" | "dark" } {
  const p = Math.min(1, Math.max(0, progress));
  const stage = stageFor(p);
  const stops = stage === "dark" ? DARK_STOPS : LIGHT_STOPS;

  let lower = stops[0];
  let upper = stops[stops.length - 1];

  for (let i = 0; i < stops.length - 1; i++) {
    if (p >= stops[i].at && p <= stops[i + 1].at) {
      lower = stops[i];
      upper = stops[i + 1];
      break;
    }
  }

  const span = upper.at - lower.at;
  const t = span === 0 ? 0 : (p - lower.at) / span;

  return {
    stage,
    ground: mixHex(lower.ground, upper.ground, t),
    fg: mixHex(lower.fg, upper.fg, t),
    fgMuted: mixHex(lower.fgMuted, upper.fgMuted, t),
    fgSubtle: mixHex(lower.fgSubtle, upper.fgSubtle, t),
    accent: mixHex(lower.accent, upper.accent, t),
    accentBright: mixHex(lower.accentBright, upper.accentBright, t),
    surface: mixNumber(lower.surface, upper.surface, t),
    raised: mixNumber(lower.raised, upper.raised, t),
    line: mixNumber(lower.line, upper.line, t),
    lineStrong: mixNumber(lower.lineStrong, upper.lineStrong, t),
  };
}
