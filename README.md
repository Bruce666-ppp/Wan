# Wan Boyang — Portfolio

Static English portfolio built with HTML, CSS, vanilla JavaScript and Node.js (20+). No npm dependencies or database. Contact submissions use Formspree.

## Local preview

Run these commands from this folder:

```sh
npm run build
npm run check
node scripts/serve.mjs 4174
```

Open http://127.0.0.1:4174/. Rebuild after editing source files. Do not edit `dist/` directly.

## Source map

- `scripts/build.mjs`: homepage, shared navigation/footer, page generation.
- `content.json`: shared content and project data; custom page templates override some legacy fields.
- `about-case.html`: About / Research.
- `kneeup-case.html`, `torras-case.html`, `polyband-case.html`: project details.
- `contact-form.html`, `contact.js`: inline form, validation and asynchronous submission to Formspree. Name optional; email and message required. Hidden subject included in FormData. Success requires a successful service response; failures retain inputs.
- `styles.css`: responsive site styling.
- `assets/`: local images, KneeUp promotional MP4 and Portfolio.pdf.
- `scripts/check.mjs`: page, link, anchor and local asset checks.
- `dist/`: generated deployable site, excluded from Git and produced by Actions.

## GitHub Pages

Repository: https://github.com/Bruce666-ppp/Wan
Expected public site: https://bruce666-ppp.github.io/Wan/

In repository Settings > Pages, choose GitHub Actions as the source. `.github/workflows/pages.yml` builds and checks the site on each push to `main`, then deploys `dist/`. All local URLs are relative to support the `/Wan/` project path. Each detail page is a standalone HTML document and supports direct navigation and refresh.

## Updating

```sh
npm run build
npm run check
git add .
git commit -m "Update portfolio"
git push origin main
```

Wait for the Deploy portfolio to GitHub Pages workflow to succeed. If Pages was enabled after the first push, run the workflow manually in Actions.

Keep secrets, `.env` and `node_modules` outside version control. The public Formspree endpoint is intentionally included; there are no email passwords in the frontend. Form submission requires internet access and the Formspree service.
