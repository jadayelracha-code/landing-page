# Racha Jadayel · 0 to 1 Product Builder & AI Automation

One-page, mobile-first site for people I meet at Web Summit. They scan a QR code, land here and book a free 30-minute intro call.

Plain HTML, CSS and a little JS. No framework, no build step.

**Live URL:** https://jadayelracha-code.github.io/landing-page/

## Page sections

1. **Hero:** name and role, headline, free intro call button, and an animated prescription card ("Rx for your business")
2. **Tools I work with:** scrolling strip of tool names with brand icons
3. **What I automate:** four service cards
4. **See it in action:** four animated use-case tabs (chat, chaos to calm, agent log, your morning)
5. **MCP:** one AI agent connected to all your tools
6. **How it works:** five steps, Intro call, Discover, Build, Test & measure, Scale, with a scroll-driven timeline
7. **Things I've built:** The Fourth Player plus past ventures and roles
8. **Currently learning:** CMU Portugal Academy, plus credentials
9. **About** and a final call to action with LinkedIn

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page content, meta tags and structured data |
| `style.css` | All styles (accent colour is `--accent` at the top) |
| `script.js` | Booking link setting and all animations |
| `assets/photo.jpg` | Profile photo (About section) |
| `assets/avatar.jpg` | Small photo in the header |
| `assets/og-image.jpg` | 1200×630 image shown when the link is shared |
| `assets/qr.png` | QR code pointing to the live URL, ready to print |
| `assets/cmu-portugal-academy.png` | CMU Portugal Academy logo |
| `assets/favicon*.png`, `assets/apple-touch-icon.png` | Browser and phone icons |
| `sitemap.xml` | Sitemap to submit in Google Search Console |

## Change the booking link

<!-- Paste your booking link into CALENDLY_URL on line 3 of script.js. -->

Open `script.js` and edit line 3:

```js
const CALENDLY_URL = "https://calendly.com/jadayelracha/30min-free-call";
```

Every **Book a free intro call** button uses this link. If it is set back to `https://calendly.com/YOUR-LINK`, the buttons fall back to an email to jadayelracha@gmail.com.

## After an update

Files are loaded with a version number (`style.css?v=58`). Raise the number in `index.html` after changing CSS or JS, so browsers load the new files instead of an old saved copy.

## Moving to a custom domain

1. Add the domain in **Settings → Pages → Custom domain** and set up DNS as GitHub describes.
2. Replace `https://jadayelracha-code.github.io/landing-page/` everywhere in `index.html` (canonical, Open Graph, X, structured data) and in `sitemap.xml`.
3. Regenerate `assets/qr.png` for the new address.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
