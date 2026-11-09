# Racha Jadayel · 0 to 1 Product Builder & AI Automation

One-page, mobile-first site for people I meet at Web Summit. They scan a QR code, land here and book a free 30-minute intro call.

Plain HTML, CSS and a little JS. No framework, no build step.

**Live URL:** https://rachajadayel.com/

## Web Summit experiment

The site tests which offer people care about more:

| Page | Offer | QR code | Booking tag |
| --- | --- | --- | --- |
| `/` (home) | Choose a door: build or automate | `assets/qr.png` | `utm_campaign=home` |
| `/build/` | 0 to 1 product building (idea to MVP) | `assets/qr-build.png` | `utm_campaign=build` |
| `/automate/` | AI automation | `assets/qr-automate.png` | `utm_campaign=automate` |

**Where to read the results**
- **Visits per page:** Cloudflare dashboard → Analytics & Logs → Web Analytics → rachajadayel.com (cookie-free).
- **Bookings per offer:** in Calendly, each booking shows its UTM campaign (home, build or automate).
- **Conversations:** keep a simple tally of what people say they need.

The pages are generated from shared sections; edit shared content (proof, process, FAQ answers) in all three HTML files.

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
| `assets/icons.svg` | All line and brand icons (one file, referenced by the page) |
| `CNAME` | Custom domain for GitHub Pages (rachajadayel.com). Do not delete |
| `sitemap.xml` | Sitemap with image entries, to submit in Google Search Console |
| `robots.txt` | Allows search engines and AI crawlers |
| `llms.txt` | Plain-text summary for AI tools (an emerging, optional convention) |

## AI search (GEO) setup

- **Structured data:** one connected JSON-LD `@graph` in `index.html`: WebSite, ProfilePage, Person, ProfessionalService (services, areas served, free intro call offer), the ventures and employers, and an FAQPage that mirrors the visible FAQ word for word. Keep the two in sync when editing the FAQ.
- **Answer-first content:** each main section has an H2 followed by a short answer paragraph; the FAQ uses question headings with 2 to 3 sentence answers.
- **Facts in one place:** the key numbers sit in the "Things I've built" cards and in `llms.txt`.
- **No-JS friendly:** all text and the booking link are in the HTML itself. JavaScript only adds animation.

## Change the booking link

<!-- Paste your booking link into CALENDLY_URL on line 3 of script.js. -->

Open `script.js` and edit line 3:

```js
const CALENDLY_URL = "https://calendly.com/jadayelracha/30min-free-call";
```

Also replace the same link in `index.html` (buttons, FAQ and structured data), so crawlers that do not run JavaScript see it too. Every **Book a free intro call** button uses this link. If it is set back to `https://calendly.com/YOUR-LINK`, the buttons fall back to an email to jadayelracha@gmail.com.

## After an update

Files are loaded with a version number (`style.css?v=71`). Raise the number in `index.html` after changing CSS or JS, so browsers load the new files instead of an old saved copy.

## Domain

The site runs on **rachajadayel.com**, registered at Cloudflare (DNS only records pointing to GitHub Pages: 4 A, 4 AAAA and a `www` CNAME). The `CNAME` file in this repo tells GitHub Pages to serve the custom domain. Renewal reminders are in Google Calendar for 2 to 9 November 2029.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.
