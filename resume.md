## Online Ruler Scale — onlinerulerscale.com

*Personal project · Astro, TypeScript, Tailwind CSS 4*

A free, privacy-first on-screen ruler that measures in real-world units instead of guessed
pixel densities. Unlike typical "online ruler" tools that render tick marks at a fixed 96
DPI, this app calibrates itself to the user's actual screen before any measurement is taken.

**Highlights**

- Built three independent calibration methods (auto-detect via device metrics, screen-diagonal
  input, and physical credit-card comparison) so accuracy doesn't depend on the browser
  correctly reporting device pixel ratio.
- Implemented a free two-point measurement mode that lets users drag between any two points
  on screen, not just from a fixed ruler edge.
- Designed shareable calibration links, letting a calibration be carried to another device or
  handed to a teammate without redoing the process.
- Runs entirely client-side with no accounts, tracking, or server-side data collection —
  measurements never leave the browser.
- Shipped as a fully static Astro site (marketing pages, FAQ, and the ruler app itself) with a
  custom Vercel-inspired design system, dark mode, keyboard shortcuts, and fullscreen support.
- Owned the project end-to-end: architecture, UI/UX and design system, calibration algorithms,
  and production deployment.

**Stack:** Astro 7, TypeScript, Tailwind CSS 4, static hosting with sitemap generation.
