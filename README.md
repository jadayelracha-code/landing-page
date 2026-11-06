# Racha Jadayel · AI & n8n automation landing page

One-page, mobile-first site for people I meet at Web Summit. They scan a QR code, land here and book a free 30-minute automation audit.

Plain HTML, CSS and a little JS. No framework, no build step.

**Live URL:** https://jadayelracha-code.github.io/landing-page/ (once GitHub Pages is enabled, see below)

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page content |
| `style.css` | All styles (accent colour is `--accent` at the top) |
| `script.js` | The booking link setting |
| `assets/photo.jpg` | Placeholder photo. Replace it with your own square photo, same filename |
| `assets/qr.png` | QR code pointing to the live URL, ready to print |
| `assets/favicon.*`, `assets/apple-touch-icon.png` | Browser and phone icons |

## Add your Calendly link

<!-- Paste your Calendly link into CALENDLY_URL on line 3 of script.js. -->

Open `script.js` and replace the placeholder on line 3:

```js
const CALENDLY_URL = "https://calendly.com/YOUR-LINK";
```

with your real link, for example `"https://calendly.com/your-name/30min"`. Commit and push, and every **Book a free 30-min audit** button will open Calendly.

While the value is still the placeholder, the buttons fall back to an email to jadayelracha@gmail.com.

## Turn on GitHub Pages

1. Go to the repo **Settings → Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**.
3. Pick branch **main** and folder **/ (root)**, then **Save**.
4. After a minute or two the site is live at the URL above.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
