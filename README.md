# Kamil Kurdziel — Portfolio

Personal portfolio site. Terminal / engineering aesthetic. PL / EN toggle.

> `.NET Lead Engineer | Mentor & CTO`

## Stack

Astro 6 · React 19 · TypeScript · pnpm · `astro:assets` (sharp) · hand-rolled CSS.

## Run

```sh
pnpm install
pnpm dev      # localhost:4321
pnpm build    # static output → ./dist/
pnpm preview
```

Requires Node ≥ 22.12.

## Structure

```
src/
├── pages/index.astro     # entry, mounts <Portfolio client:load />
├── components/           # Portfolio, BootIntro, SocialIcon
├── lib/data.ts           # all content (PL + EN) + static data
├── styles/global.css     # CSS vars, scanlines, glitches, responsive
└── assets/portrait.jpg   # optimized at build via astro:assets
```

All copy lives in `src/lib/data.ts`. Visual tokens are CSS custom properties in `global.css`.

## Notice

Photos and personal content © Kamil Kurdziel. Code is free to read and learn from.
