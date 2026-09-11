# Peace Solomon, Carloha Nigeria

A single-page portfolio site for Peace Solomon, Senior Sales Manager at Carloha Nigeria.
Pure HTML / CSS / JavaScript. No build step, no dependencies.

## Structure

```
index.html        Markup + copy
css/style.css     All styling, animations, responsive rules
js/main.js        Sticky header, scroll reveal, counters, mobile nav, parallax
assets/           Images (see below)
```

## Images

`assets/peace-logo.png` is the site logo (header, footer, favicon).

The site works without the photo images (dark placeholder panels show the expected
filename), but for launch drop these files into `assets/`:

| File | Used in | Suggested size |
|------|---------|----------------|
| `hero1.png`, `hero2.png`, `hero3.png` | Hero slider (auto-rotates, dots to jump) | 1600x1200, landscape |
| `peace.jpg`           | About section     | 900x1120 (portrait) |
| `tiggo9.jpg`          | Portfolio card 01 | 1000x700 |
| `himla.jpg`           | Portfolio card 02 | 1000x700 |
| `chery-q.jpg`         | Portfolio card 03 | 1000x700 |

To change how many slides the hero shows, add or remove a `.hero-slide` block (with
a matching `.hero-dot` button) in `index.html`; the slider JS in `js/main.js`
(`#heroSlider`) picks up any number of slides automatically.

Filenames must match exactly. If a file is missing the layout still holds; it just
shows a styled placeholder instead of the photo.

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173

## WhatsApp button

The floating green button links to `https://wa.me/2347030040828` with a pre-filled
enquiry message. If Peace uses a different number for WhatsApp, edit that link in
`index.html`.

## Contact form

The form uses a `mailto:` action so it works with zero backend. It opens the
visitor's email client addressed to `Peace.Solomon@Carloha.com`. To capture
submissions server-side instead, point the `<form action>` at a service such as
Formspree, Getform, or a Netlify form and remove `enctype="text/plain"`.

## Deploy

It is fully static. Upload the folder to Netlify, Vercel, Cloudflare Pages,
GitHub Pages, or any web host. No configuration required.

## Brand

- Primary: `#F74C00`
- Headings: Sora / Body: Inter (loaded from Google Fonts)
- All colours are CSS variables at the top of `css/style.css`
