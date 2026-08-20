# @shownspace/brand

The Shown Space brand kit. **One source of truth** for our colours, type, and the
disc spinner — shared by the website, the app, and anything else we build.

> 🎨 **Visible brand page:** _(add the GitHub Pages URL here once enabled)_
> It's generated from the tokens on every push, so what you see there is always
> exactly what's in the code. Don't screenshot the brand into slides — link this.

---

## How it's structured

```
src/tokens.js            ← the single source of truth (colours, fonts, spinner)
src/web/BrandSpinner.jsx ← React DOM component (reads tokens)
src/native/BrandSpinner.jsx ← React Native / Expo component (reads tokens)
styleguide/build.mjs     ← generates the visible style-guide page FROM tokens
styleguide/index.html    ← generated — DO NOT edit by hand
```

**The rule:** nothing hardcodes a brand hex, font, or the spinner spec. Everything
— components *and* the style guide — imports `tokens`. Change a value in
`src/tokens.js` and it changes everywhere at once.

---

## Using it in an app

Install straight from GitHub (no npm publish needed):

```bash
npm install github:Shown-Space/shownspace-brand
```

**Website (Next.js):**

```jsx
import { BrandSpinner } from "@shownspace/brand/web";
import { tokens } from "@shownspace/brand/tokens";

<BrandSpinner size={40} />;
tokens.color.brand.blue; // "#3897bc"
```

> The package ships JSX source, so add it to `transpilePackages` in `next.config.js`:
> `transpilePackages: ["@shownspace/brand"]`

**App (Expo / React Native):**

```jsx
import { BrandSpinner } from "@shownspace/brand/native";
<BrandSpinner size={40} />;
```

> Requires `react-native-svg` and `react-native-reanimated` in the app.

---

## The visible style guide (how "pretty + strict" works)

`npm run build:styleguide` reads `src/tokens.js` and writes `styleguide/index.html`
— a designed page showing the palette, type, and live spinner. A GitHub Action
(`.github/workflows/pages.yml`) runs that build on every push to `main` and
publishes it to **GitHub Pages**.

So the flow is:

```
edit src/tokens.js  →  push  →  page rebuilds & redeploys automatically
```

Non-coders always see the current, correct brand — no manual updating, no drift.

**To turn the page on:** repo → Settings → Pages → Source: *GitHub Actions*.
Then paste the URL at the top of this README.

Preview locally: `npm run build:styleguide && open styleguide/index.html`.

---

## Changing a brand value

1. Edit the value in `src/tokens.js` (only there).
2. `npm run build:styleguide` to preview the style guide locally.
3. Push. CI redeploys the page; apps pick it up on their next `npm update`.

## What lives here (and what doesn't)

- ✅ Brand primitives: colours, fonts, the spinner, and future shared marks/logos.
- ❌ App-specific layout, one-off screens, business logic — those stay in each app.

## ⚠️ This repo is public — no secrets, ever

This repo is public so the style guide can be hosted for free. It must only ever
contain non-sensitive brand assets (colours, fonts, marks, components).

- **Never commit** API keys, tokens, `.env` files, credentials, or DB schema.
  Those live in each app, never here. (`.gitignore` blocks the common ones, and
  GitHub secret-scanning push protection is enabled as a backstop.)
- **`main` is protected:** all changes go through a pull request — nobody, not
  even admins, pushes straight to `main`. Outside GitHub users can read/fork but
  cannot edit; only Shown-Space members with write access can open PRs.
