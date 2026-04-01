# CLAUDE.md

## Project
J & K Dating Night Ideas — A warm, playful webapp for couples to discover and generate personalized date night ideas with filters, favorites, and confetti celebrations.

## Stack
- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS 4 (via @tailwindcss/postcss)
- canvas-confetti for celebration animations
- localStorage for favorites persistence
- Deployed on Vercel

## Structure
- src/app/           — Routes and layouts (App Router)
- src/components/    — React components (DateCard, Filters, Header, etc.)
- src/lib/           — Shared utilities, types, date ideas data
- public/            — Static assets

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`

## Verification (run after every change)
1. `npx tsc --noEmit` — fix type errors first
2. `npm run lint` — fix lint warnings
3. `npm run build` — confirm production build passes

## Conventions
- Default to Server Components; only add "use client" when interactivity needed
- Warm color palette: cream bg (#FFF3E9), coral CTA (#E98074), navy headers (#26458B)
- Rounded corners (16-20px), soft shadows for cards
- Mobile-first responsive design
- Use `unknown` over `any`; narrow types explicitly
- Small focused functions with early returns

## Don't
- Don't use `any` type
- Don't skip error handling on async operations
- Don't hardcode config — use env vars for secrets
- Don't create files unless absolutely necessary — edit existing ones
- Don't commit without running the verification sequence above
- Don't add dark mode — this app uses a fixed warm light theme

## Workflow
- For non-trivial tasks: plan first, then code
- After any correction from user: add a rule here to prevent recurrence
- Prefer editing existing files over creating new ones
