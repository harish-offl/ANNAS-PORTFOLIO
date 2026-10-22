# Visual / responsive validation scripts

These scripts drive a **headless Chrome** instance over the Chrome DevTools
Protocol (CDP) using Node's built-in `WebSocket` — no Puppeteer or Playwright
dependency is required.

## Prerequisites

1. Build and serve the app on port **3050**:

   ```bash
   npm run build
   npx next start -p 3050
   ```

2. Start headless Chrome with a remote debugging port:

   ```bash
   chrome --headless=new --disable-gpu --remote-debugging-port=9333 \
          --no-first-run --user-data-dir=<temp-dir>
   ```

## Scripts

| Script | Command | What it checks |
| --- | --- | --- |
| `validate-responsive.js` | `npm run validate:responsive` | Horizontal overflow, applied viewport size, tilt counts, heading typography, hero wrapping, console errors — across 9 widths from 320px to 1920px. Writes `validation-results.json` and refreshes `screenshots/`. |
| `verify-geometry.js` | `npm run validate:geometry` | Compares each tilt element's rendered axis-aligned bounding box against the box predicted from its `rotate` angle, and confirms hover straightens the tilt (`-3deg` → `0deg`). |
| `verify-animation.js` | `npm run validate:animation` | Samples frames during Framer Motion entrance animations to confirm the CSS `rotate` property composes with the inline `transform` instead of overriding it. |

`audit-snippet.js` holds the browser-side audit code shared by the validator.

## Notes

- The validator opens a **fresh tab per viewport**. Reusing a single tab lets
  Chrome's device-metrics emulation state leak between navigations, which
  produces false horizontal-overflow readings (e.g. a 320px viewport inheriting
  a wider layout viewport).
- `mobile: true` is required for accurate mobile emulation; with `mobile: false`
  Chrome reports a desktop scrollbar and `clientWidth` is 8px narrower than
  `innerWidth`.

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `TARGET_URL` | `http://127.0.0.1:3050` | Server under test. Point at the dev server to validate a live dev build: `TARGET_URL=http://127.0.0.1:3040 npm run validate:responsive` |
| `CDP_PORT` | `9333` | Chrome remote-debugging port. |

Example (PowerShell):

```powershell
$env:TARGET_URL = 'http://127.0.0.1:3040'
npm run validate:responsive
```

## Corporate TLS interception

On networks with TLS inspection (e.g. a Sophos proxy), Node cannot verify the
intercepted certificate and `next/font/google` silently falls back to system
fonts. Point Node at the interception CA:

```powershell
$env:NODE_EXTRA_CA_CERTS = "$HOME\.certs\sophos-ssl-ca.pem"
```

The CA must be exported as PEM from the proxy's root certificate.
