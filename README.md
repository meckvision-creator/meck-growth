# MECK. · Growth Operations Builder

Personal portfolio for Meck (Zayn). Plain static site: HTML, CSS and vanilla JS, no build step.

Live: https://meck-growth.pages.dev

## Fill in your links
Edit `assets/js/config.js` (email, booking link, LinkedIn). Every button on both pages reads from it.

## Deploy
Manual (from this folder):

```bash
npx wrangler pages deploy . --project-name=meck-growth --branch=main
```

Automatic on every push to `main`: add two repo secrets in GitHub → Settings → Secrets and variables → Actions:
- `CLOUDFLARE_API_TOKEN` — a Cloudflare API token with the "Cloudflare Pages: Edit" permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID

## Files
- `index.html` — main single-page site
- `contact.html` — contact page with a brief form (opens the visitor's email app)
- `assets/css/style.css`, `assets/js/main.js`, `assets/js/config.js`
- `assets/img/` — favicon, apple touch icon, Open Graph image
