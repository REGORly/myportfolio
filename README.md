# REGOR portfolio

Scrapbook-meets-premium-purple portfolio. React + Vite + TypeScript + Tailwind CSS + Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, then builds to /dist
npm run preview
```

## Make it yours

Everything personal is in `src/data/`. You rarely need to touch a component.

| File | What it controls |
| --- | --- |
| `profile.ts` | Tagline, intro, About story, software list and **contact links** |
| `projects.ts` | Work cards and case studies (all currently clearly-marked samples) |
| `skills.ts` | The six skills, interest tags and the hero ticker |

### Contact links
The links in `profile.links` are empty on purpose. Until you fill them in, the Contact section shows greyed
placeholders marked "add yours". Add full URLs (`https://instagram.com/you`) and a plain email address.

### Your own images
1. Put files in `public/images/`.
2. In `projects.ts`, set `cover: '/images/my-cover.jpg'` and `gallery: ['/images/a.jpg', ...]`.
3. In `Playground.tsx`, add `src: '/images/x.jpg'` to any polaroid item.

Without a `src`, a generated placeholder (built from your palette) is shown.

### Hide the "sample" tags
Set `showSampleTags = false` in `src/data/projects.ts`.

## Structure

```
src/
  components/   Cursor, Navbar, Float, Parallax, Drop, Polaroid, Tape, Doodles, Marquee, TornEdge ...
  sections/     Hero, About, Work, CaseStudy, Playground, Contact
  data/         profile, projects, skills
  lib/          hooks, parallax context, utils
```

Case studies open at `#/work/<slug>`, so they can be linked to, and the browser back button closes them.

## Design notes
- Palette: Imperial Violet `#2A123F`, Amethyst Noir `#4B1F6F`, Dusted Lavender `#9C8CB9`, Orchid Smoke `#C686DD`, Moon Pearl `#F1EDF7`.
- Type: Bricolage Grotesque (variable, condensed for display) and Caveat for handwriting. Loaded from Google Fonts in `index.html`.
- Motion respects `prefers-reduced-motion`. The custom cursor only appears on devices with a mouse or trackpad.
