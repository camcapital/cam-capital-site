# CAM Capital: landing page (v1)

Static single-page site. Plain HTML, CSS and a small vanilla JS file for motion. No build step.

## Run locally

```sh
python3 -m http.server 8080
# open http://localhost:8080
```

Or just open `index.html` in a browser.

## Structure

```
index.html          page markup (hero, approach, products, closing band, footer)
assets/styles.css   all styles, mobile-first, design tokens at the top
assets/main.js      scroll reveals + header behaviour (optional; page works without it)
assets/favicon.svg
```

## Live site

https://camcapital.github.io/cam-capital-site/ (GitHub Pages, deployed from `main` / root)

## Not yet included

Contact details, social links and a contact button were removed for v1. Add them back to
`index.html` (footer and the CTA band) when ready.

## Deploy

Any static host works with the repo root as the publish directory:

- **Vercel:** import the repo, framework preset "Other", no build command.
- **Netlify:** drag the folder into the dashboard, or connect the repo with an empty build command and publish dir `.`.
- **GitHub Pages:** Settings, Pages, deploy from branch `main`, folder `/ (root)`.

## Accessibility notes

- Semantic landmarks, skip link, visible focus styles
- Text contrast meets WCAG AA (muted text 6.6:1 on the page background)
- Respects `prefers-reduced-motion`: reveals and the equalizer animation are disabled
- Content is visible with JavaScript disabled
