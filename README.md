# Diggibyte at Data Innovation Summit MEA 2026: booth page

Interactive "Spin the dial" page for the Diggibyte booth at the
**Data Innovation Summit MEA 2026** (5th MEA edition, 14–15 October 2026, JW Marriott Hotel Marina, Dubai).

The dial has six industries: Energy & Utility, Retail, Manufacturing, Infrastructure, Tourism and Healthcare.

Visitors spin it, or tap an industry. The page then shows who the industry content is for, which
summit stage it relates to, what Diggibyte builds for it on Databricks, an illustrative MEA use case,
a three-step booth demo and an "Open the demo" button that links to that industry's demo app.
Industries with a demo also get a small link icon next to their label on the dial.

Below the industry detail, an "Accelerators we've built" section introduces Databricks In-a-Box,
DataLab and DiggiOntos, with links. Below that sit a Diggibyte section and the summit's key facts.
A countdown in the hero switches to a "live" message during the summit and a thank-you afterwards.

It follows the structure of `diggibyte/dbx_wt`, but with a different interaction and layout.

## Where the content comes from

| Content | Source |
| --- | --- |
| Dates, venue, edition, delegate cap, speakers, stages, TIP sessions, exhibitors, Hyperight, Agorify | DIS MEA 2026 home page |
| Summit stage names | DIS MEA 2026 home page, "Explore the stages" |
| Diggibyte summary: Databricks Gold Partner, data, GenAI and agentic AI, most Databricks Champions in the Nordics, 2 Databricks MVPs | Diggibyte's listing on the DIS MEA 2026 partners page |
| Use cases, company types and figures | Illustrative, written for the booth (labelled on the page) |
| Countdown start and end times | Assumed (09:00 to 18:00 Dubai time); the site gives dates only |

## Structure

```
index.html            Page markup (top bar, hero with dial and countdown, industry detail, Diggibyte, summit facts)
css/styles.css        All styling; brand colours and fonts are CSS variables in :root
js/storylines.js      Content: event, facts, Diggibyte, technologies, summit stages, the six industries
js/app.js             Dial spin, reveal animation, attract mode, keyboard, countdown
assets/img/           Diggibyte logo, Databricks Gold Partner badge, DIS logo (placeholder, keep the file name)
assets/icons/         One icon per industry
.nojekyll             Tells GitHub Pages to serve the files as they are
```

No build step and no dependencies. Plain HTML, CSS and JavaScript. Fonts (Sora and Inter Tight)
load from Google Fonts, with system fallbacks.

## Run locally

```
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish on GitHub Pages

1. Create a repository named `dbt_dis` under the `diggibyte` organisation.
2. Push these files to `main`, with `index.html` at the root:
   ```
   git init
   git add .
   git commit -m "DIS MEA 2026 booth page"
   git branch -M main
   git remote add origin https://github.com/diggibyte/dbt_dis.git
   git push -u origin main
   ```
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`, and **Save**.
5. The page goes live at `https://diggibyte.github.io/dbt_dis/` within a couple of minutes.

Link to one industry with its id: `#energy`, `#retail`, `#manufacturing`, `#infrastructure`,
`#tourism` or `#healthcare`.

## Demo URLs

Each industry in `js/storylines.js` has a `url` field. Energy & Utility, Retail and Manufacturing link
to their Databricks Apps demos. Infrastructure, Tourism and Healthcare are still empty: their button
reads "Demo link coming soon" and their dial label has no link icon. Add a URL and both appear.

## Common edits

| Change | Where |
| --- | --- |
| Headline and intro | `index.html`, `<section class="hero">` |
| Event details, countdown times, links | `js/storylines.js`, `EVENT` |
| Summit facts strip | `js/storylines.js`, `FACTS` |
| Diggibyte summary and proof points | `js/storylines.js`, `DIGGIBYTE` |
| Industry text, offers, use cases, demo steps, demo URLs | `js/storylines.js`, `STAGES` |
| Which summit stage an industry is tagged with | `js/storylines.js`, `stage` field and `SUMMIT_STAGES` |
| Technology names | `js/storylines.js`, `TECH` |
| Accelerator cards (text, highlights, links) | `js/storylines.js`, `ACCELERATORS` |
| Brand colours, fonts | `css/styles.css`, `:root` |
| Background glow colours and speed | `css/styles.css`, `.glow-a/.glow-b/.glow-c` and `@keyframes drift-*` |
| Auto-spin timing (idle 40 s, then every 20 s) | `js/app.js`, `IDLE_MS` and `AUTO_MS` |
| Logos and stage icons | `assets/img/`, `assets/icons/` (keep file names) |

The dial adapts to the number of entries in `STAGES`. Six fits best; if you change the count,
update the segment colours in `.ring` in `css/styles.css` to match.

## Booth tips

- Press **Space** or tap **Spin** to spin. **Left/Right arrows** step through the industries.
- Tap an industry label to jump straight to it.
- After 40 seconds without interaction the dial spins on its own every 20 seconds.
- Run the browser full-screen (F11) on the booth display.

## Before the event

- **Colours.** The palette in `:root` is a best match and is not verified against the DIS brand guide.
  Replace the hex values with the official ones.
- **Background.** The summit site uses a looping background video. This page recreates the feel with
  animated CSS glows instead; the video is not included.
- **Logos.** The Diggibyte logo and the Databricks Gold Partner badge are the real files. The DIS logo is still a text
  placeholder; swap in the official file, and check you have the rights to use it.
- **Demo URLs.** Fill in the three remaining `url` fields (see above).
- **Accelerator links.** The DataLab and DiggiOntos GitHub repositories must be public, or visitors
  will see "page not found".
- **Facts.** Check the facts against the summit site shortly before the event, in case they change.
