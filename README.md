# Sameer Majeed — Architecture of Financial Clarity

Next.js 15 portfolio with GSAP + Lenis scroll storytelling, sticky experience chapters, and a blue/white financial clarity design system.

## Local

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```sh
npm run build
npm start
```

## Vercel

1. Import `MUsmanFar/sameer-majeed` in Vercel.
2. Framework preset: **Next.js** (auto-detected).
3. Build command: `npm run build`
4. Output: default Next.js (no static export required).
5. Node.js: **20.x** or newer.

No environment variables are required for the public portfolio build.

## Key paths

- `app/page.tsx` — site entry
- `components/architecture/` — ArchitectureClarity shell, chapters, sticky experiences
- `lib/career-data.ts` — profile, roles, employers, certificates
- `public/` — portrait, logos, certificates, 3D assets
