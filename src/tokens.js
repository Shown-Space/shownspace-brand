/**
 * SHOWN SPACE — BRAND TOKENS  (the single source of truth)
 * --------------------------------------------------------
 * Every app and the style guide read from THIS file. Change a value here and it
 * changes everywhere — components, the website, the app, and the visible style
 * guide (which is generated from these tokens, so it can never drift).
 *
 * Rule: never hardcode a brand hex, font, or the spinner spec anywhere else.
 * Import it: `import { tokens } from "@shownspace/brand/tokens";`
 */

// Primitives — the raw brand values. Everything else references these.
const brand = {
  blue: "#3897bc", // primary — ss-blue
  navy: "#033860",
  navyDark: "#022643", // hover / active
  gold: "#e6af2e",
};

const neutral = {
  ink: "#0d1b28", // near-black text
  inkSoft: "#46586a",
  inkFaint: "#7f92a3",
  line: "#dbe4ee", // hairlines / borders
  surface: "#ffffff",
  bg: "#f4f7fa", // page ground (cool-biased)
  track: "#e2e8f0", // spinner ring / disabled
};

const font = {
  display: '"Space Grotesk", system-ui, sans-serif', // sport / hero
  heading: '"Manrope", system-ui, sans-serif', // headings / UI
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
};

export const tokens = {
  color: { brand, neutral },
  font,
  // The disc spinner spec — consumed by every BrandSpinner. Colors reference the
  // primitives above so there is exactly one hex for the blue.
  spinner: {
    track: neutral.track,
    arc: brand.blue,
    strokeWidth: 11,
    radius: 38, // on a 0–100 viewBox, centered at 50,50
    dashArray: "60 179", // arc length + gap
    durationMs: 850,
  },
};

export default tokens;
