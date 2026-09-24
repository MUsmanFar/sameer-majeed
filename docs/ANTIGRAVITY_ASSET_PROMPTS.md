# Antigravity asset prompts — Sameer Majeed Portfolio

Use these prompts in **Antigravity / image gen** to create **transparent PNG** assets (no background, no floor shadow plane, no studio backdrop).  
Save outputs into: `public/assets/generated/` with the filenames below.

**Style guide (all prompts):** editorial 3D product render, soft studio lighting, deep navy `#0F1C2E` + financial blue `#1E4D8C` + cool white accents, clean geometry, premium finance aesthetic, isolated subject, transparent background, 4K, centered composition.

---

## Currently wired in the site (existing files)

| Section | File in use now |
|---------|-----------------|
| Opening (Ledger) | Title-card only (no hero asset) |
| Hero | `portrait/sameer-majeed.png` + faint `hero-sculpture.png` |
| Foundation | `audit-core.webp` |
| Control | `control-blocks.png`, `control-engine.webp`, `cashflow-core.webp` |
| Saudi / Najm | `riyadh-destination.webp` |
| FP&A Al Rajhi | `planning-core.webp` |
| Flooss | `erp-network.webp` + portrait |
| Constellation | `career-orbit.webp` |
| Philosophy | portrait (silhouette) |
| Credentials | certificate PNGs in `/public/certificates/` |

Unused existing (can swap anytime): `analysis-prism.webp`, `audit-core-open.webp`, `budget-stack.webp`, `credential-pedestal.webp`, `forecasting-curve.webp`, `foundation-ledger.png`, `lahore-origin.webp`, `planning-prism.png`, `powerbi-prism.webp`, `reporting-tower.webp`, `hero-glass-sculpture.jpg`, `foundation-ledger-block.jpg`.

---

## Currently generated & wired

| File | Section |
|------|---------|
| `opening-emblem.png` | Opening title card |
| `hero-signal.png` | Hero (beside portrait) |

## Still to generate (drop into `public/assets/generated/`)
**Filename:** `foundation-audit.png`  
**Prompt:**  
`3D audit foundation object: open ledger core with precise paper layers and a small control stamp motif, transparent background, navy and blue metal edges, no text, no desk, isolated product render.`

### 03 — Control (3 station variants)
**Filename:** `control-station-01.png`  
**Prompt:**  
`3D stacked account blocks representing head of accounts control, transparent background, cobalt and white materials, clean edges, no text.`

**Filename:** `control-station-02.png`  
**Prompt:**  
`3D cashflow engine: interlocking gears and a flowing currency ribbon abstracted, transparent background, navy blue palette, no logos, no text.`

**Filename:** `control-station-03.png`  
**Prompt:**  
`3D finance leadership prism: ascending control panels as glass slabs, transparent background, premium blue lighting, no text.`

### 04 — Riyadh / Reporting
**Filename:** `riyadh-reporting.png`  
**Prompt:**  
`Abstract Riyadh reporting tower made of layered translucent blue statement sheets forming a skyline silhouette, transparent background, no buildings photo, no text, editorial 3D.`

### 05 — FP&A / Planning
**Filename:** `fpa-forecast.png`  
**Prompt:**  
`3D Actual Budget Forecast tri-curve ribbon in navy, cobalt, and silver, floating, transparent background, no numbers, no charts axes, clean abstract forecasting sculpture.`

### 06 — Flooss / Fintech
**Filename:** `flooss-network.png`  
**Prompt:**  
`Fintech network node cluster: luminous blue nodes connected by thin glass filaments, transparent background, premium tech-finance look, no logos, no text.`

### 07 — Constellation / Journey
**Filename:** `journey-constellation.png`  
**Prompt:**  
`Career constellation: seven glowing blue nodes on a thin arc suggesting Lahore to Riyadh progression, transparent background, no map labels, elegant 3D.`

### 08 — Intelligence / Expertise
**Filename:** `intelligence-prism.png`  
**Prompt:**  
`Financial intelligence prism: crystalline blue prism refracting soft light beams labeled only by abstract facets (no readable text), transparent background, premium editorial 3D.`

### 09 — Credentials Vault
**Filename:** `credential-pedestal.png`  
**Prompt:**  
`Elegant glass pedestal holding a single sealed certificate plate, transparent background, navy base, cobalt accents, no readable writing, museum-grade 3D render.`

### 10 — Philosophy
**Filename:** `philosophy-balance.png`  
**Prompt:**  
`Abstract balance sculpture: clarity disc, discipline column, foresight arc in blue glass, transparent background, serene composition, no text.`

### 11 — Journey summary line
**Filename:** `arc-spine.png`  
**Prompt:**  
`Single continuous luminous blue spine path morphing from ledger to fintech node, transparent background, simple elegant stroke in 3D glass, no text.`

### 12 — Contact
**Filename:** `contact-mark.png`  
**Prompt:**  
`Minimal SM monogram mark in navy and cobalt glass, transparent background, sharp, premium, no extra decoration.`

---

## After generation

1. Drop PNGs into `public/assets/generated/`
2. Tell the agent: “wire generated assets from public/assets/generated”
3. Prefer transparent PNG over JPG for overlays on blue/white UI
