/**
 * Builds styleguide/index.html FROM src/tokens.js.
 * Never edit index.html by hand — run `npm run build:styleguide` (CI does this
 * on every push and deploys it to GitHub Pages, so the visible page always
 * matches the code).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { tokens } from "../src/tokens.js";

const here = dirname(fileURLToPath(import.meta.url));
const { color, font, spinner } = tokens;
const dur = spinner.durationMs / 1000;

const swatch = (name, hex) => `
  <figure class="sw">
    <div class="chip" style="background:${hex}"></div>
    <figcaption><b>${name}</b><code>${hex}</code></figcaption>
  </figure>`;

const disc = (px) => `
  <span class="ss-disc" style="--dur:${dur}s">
    <svg viewBox="0 0 100 100" fill="none" style="width:${px}px;height:${px}px" aria-hidden="true">
      <circle cx="50" cy="50" r="${spinner.radius}" stroke="${spinner.track}" stroke-width="${spinner.strokeWidth}"/>
      <circle cx="50" cy="50" r="${spinner.radius}" stroke="${spinner.arc}" stroke-width="${spinner.strokeWidth}" stroke-dasharray="${spinner.dashArray}"/>
    </svg>
  </span>`;

const brandRows = Object.entries(color.brand).map(([k, v]) => swatch(k, v)).join("");
const neutralRows = Object.entries(color.neutral).map(([k, v]) => swatch(k, v)).join("");

const html = `<title>Shown Space — Brand</title>
<style>
  :root{--bg:#f4f7fa;--surface:#fff;--surface2:#eef3f8;--ink:#0d1b28;--soft:#46586a;--faint:#7f92a3;--line:#dbe4ee;--brand:${color.brand.blue};--track:${spinner.track}}
  @media (prefers-color-scheme:dark){:root{--bg:#071019;--surface:#0e1c29;--surface2:#13293a;--ink:#e7f0f8;--soft:#a4b7c7;--faint:#6d8298;--line:#1e3546;--track:#23384a}}
  :root[data-theme=light]{--bg:#f4f7fa;--surface:#fff;--surface2:#eef3f8;--ink:#0d1b28;--soft:#46586a;--faint:#7f92a3;--line:#dbe4ee;--track:${spinner.track}}
  :root[data-theme=dark]{--bg:#071019;--surface:#0e1c29;--surface2:#13293a;--ink:#e7f0f8;--soft:#a4b7c7;--faint:#6d8298;--line:#1e3546;--track:#23384a}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:${font.heading};line-height:1.6;-webkit-font-smoothing:antialiased}
  .wrap{max-width:960px;margin:0 auto;padding:0 24px}
  .eyebrow{font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--brand);margin:0}
  h1{font-family:${font.display};font-size:clamp(2.2rem,6vw,3.6rem);letter-spacing:-.02em;line-height:1.03;margin:12px 0 0}
  .lede{color:var(--soft);max-width:60ch;margin:14px 0 0}
  h2{font-size:.78rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--faint);margin:0 0 20px;display:flex;align-items:center;gap:12px}
  h2::after{content:"";flex:1;height:1px;background:var(--line)}
  header{border-bottom:1px solid var(--line);background:radial-gradient(120% 80% at 88% -10%,color-mix(in srgb,var(--brand) 16%,transparent),transparent 60%),var(--surface)}
  .hero{display:grid;grid-template-columns:1.3fr 1fr;gap:40px;align-items:center;padding:64px 0 56px}
  .stage{display:grid;place-items:center;min-height:180px;border:1px solid var(--line);border-radius:12px;background:var(--surface2)}
  @media(max-width:720px){.hero{grid-template-columns:1fr;gap:28px;padding:40px 0}}
  section{padding:52px 0;border-bottom:1px solid var(--line)}
  @keyframes ss-spin{to{transform:rotate(360deg)}}
  .ss-disc svg{animation:ss-spin var(--dur,.85s) linear infinite;display:block}
  @media(prefers-reduced-motion:reduce){.ss-disc svg{animation-duration:3.2s}}
  .swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
  .sw{margin:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden}
  .sw .chip{height:74px}
  .sw figcaption{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;font-size:12px}
  .sw b{text-transform:capitalize}
  .sw code,code{font-family:${font.mono};font-size:12px;color:var(--soft)}
  .sizes{display:flex;flex-wrap:wrap;gap:18px}
  .size-card{flex:1 1 130px;display:grid;place-items:center;gap:12px;padding:24px;background:var(--surface);border:1px solid var(--line);border-radius:12px}
  .size-card .cap{font-size:12px;color:var(--faint)}
  .size-card b{color:var(--ink)}
  .type-row{padding:16px 0;border-bottom:1px solid var(--line)}
  .type-row:last-child{border:none}
  .type-row small{display:block;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--faint);margin-bottom:6px}
  .table{width:100%;border-collapse:collapse;font-size:14px}
  .table td,.table th{text-align:left;padding:11px 14px;border-bottom:1px solid var(--line)}
  .table th{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint)}
  .scroll{overflow-x:auto;border:1px solid var(--line);border-radius:12px;background:var(--surface)}
  .note{margin-top:22px;background:var(--surface2);border:1px solid var(--line);border-left:3px solid var(--brand);border-radius:8px;padding:14px 16px;font-size:14px;color:var(--soft)}
  footer{padding:36px 0 64px;color:var(--faint);font-size:13px}
  .toggle{position:fixed;top:16px;right:16px;font:inherit;font-size:12px;font-weight:600;border:1px solid var(--line);background:var(--surface);color:var(--soft);padding:7px 12px;border-radius:999px;cursor:pointer}
  .toggle:hover{border-color:var(--brand);color:var(--brand)}
</style>

<button class="toggle" id="tg" aria-label="Toggle theme">◐ Theme</button>

<header><div class="wrap hero">
  <div>
    <p class="eyebrow">Shown Space · Brand</p>
    <h1>One source of truth.</h1>
    <p class="lede">Every colour, typeface, and the disc spinner, generated straight from
      <code>src/tokens.js</code>. Change a token, push, and this page redraws itself — it can't drift.</p>
  </div>
  <div class="stage">${disc(112)}</div>
</div></header>

<main class="wrap">
  <section>
    <h2>Brand colour</h2>
    <div class="swatches">${brandRows}</div>
  </section>
  <section>
    <h2>Neutrals</h2>
    <div class="swatches">${neutralRows}</div>
  </section>
  <section>
    <h2>Typography</h2>
    <div class="type-row"><small>Display · ${font.display.split(",")[0].replace(/"/g, "")}</small>
      <div style="font-family:${font.display};font-size:2.4rem;letter-spacing:-.02em">Ultimate, quantified.</div></div>
    <div class="type-row"><small>Heading · ${font.heading.split(",")[0].replace(/"/g, "")}</small>
      <div style="font-family:${font.heading};font-size:1.5rem;font-weight:800">Head-to-head player comparison</div></div>
    <div class="type-row"><small>Mono · data</small>
      <div style="font-family:${font.mono};font-size:1.1rem">85.9 · 55.4 · 30.5</div></div>
  </section>
  <section>
    <h2>Disc spinner</h2>
    <div class="sizes">
      ${[24, 40, 64, 96].map((s) => `<div class="size-card">${disc(s)}<div class="cap"><b>${s}px</b></div></div>`).join("")}
    </div>
    <div class="scroll" style="margin-top:20px"><table class="table">
      <thead><tr><th>Token</th><th>Value</th></tr></thead>
      <tbody>
        <tr><td>spinner.track</td><td><code>${spinner.track}</code></td></tr>
        <tr><td>spinner.arc</td><td><code>${spinner.arc}</code></td></tr>
        <tr><td>spinner.strokeWidth</td><td><code>${spinner.strokeWidth}</code></td></tr>
        <tr><td>spinner.radius</td><td><code>${spinner.radius}</code></td></tr>
        <tr><td>spinner.dashArray</td><td><code>"${spinner.dashArray}"</code></td></tr>
        <tr><td>spinner.durationMs</td><td><code>${spinner.durationMs}</code></td></tr>
      </tbody>
    </table></div>
    <p class="note">This whole page is built by <code>styleguide/build.mjs</code> reading the tokens.
      There are no hand-placed colours here — that's what keeps it honest.</p>
  </section>
  <footer>Generated from <code>src/tokens.js</code> · Shown Space brand kit</footer>
</main>

<script>
  document.getElementById("tg").addEventListener("click",()=>{
    const r=document.documentElement;
    const cur=r.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");
    r.setAttribute("data-theme",cur==="dark"?"light":"dark");
  });
</script>
`;

writeFileSync(join(here, "index.html"), html);
console.log("styleguide/index.html built from tokens ✓");
