import sharp from "sharp";
import path from "path";
import fs from "fs";

const targetDir = "d:/Projects/Sameer Majeed Portfolio/public/assets/3d";

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 1. RECOMPOSE CAREER ORBIT (shifted inward & upward: 0 clipping on left or bottom)
async function buildRecomposedCareerOrbit() {
  const width = 1600;
  const height = 800;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blueGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" result="blur1" />
          <feGaussianBlur stdDeviation="6" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="ribbonGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#121e4a" stop-opacity="0.9" />
          <stop offset="25%" stop-color="#245BFF" stop-opacity="0.95" />
          <stop offset="70%" stop-color="#3D73FF" stop-opacity="1" />
          <stop offset="100%" stop-color="#77A1FF" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="monolithGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2a3342" stop-opacity="0.95" />
          <stop offset="40%" stop-color="#121720" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#080b10" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="chromeEdge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3D73FF" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#AAB1BC" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#245BFF" stop-opacity="0.4" />
        </linearGradient>
      </defs>

      <!-- Connecting Luminous 3D Ribbon (Diagonal Lower-Left to Upper-Right) -->
      <path d="M 220,530 C 400,500 500,420 660,390 C 820,360 920,280 1080,240 C 1220,200 1340,140 1480,110"
            fill="none" stroke="url(#ribbonGrad)" stroke-width="12" filter="url(#blueGlow)" stroke-linecap="round" />
      <path d="M 220,530 C 400,500 500,420 660,390 C 820,360 920,280 1080,240 C 1220,200 1340,140 1480,110"
            fill="none" stroke="#F4F6F8" stroke-width="2.5" opacity="0.9" stroke-linecap="round" />

      <!-- Monolith 1: 2014 AUDIT (Shifted inward to x=180, y=410; fully within viewport) -->
      <g transform="translate(180, 400)">
        <polygon points="36,18 108,0 108,162 36,180" fill="url(#monolithGrad)" stroke="url(#chromeEdge)" stroke-width="2.5" />
        <polygon points="0,36 36,18 36,180 0,198" fill="#171e28" opacity="0.85" stroke="url(#chromeEdge)" stroke-width="2" />
        <polygon points="0,36 36,18 108,0 72,18" fill="#303b4d" opacity="0.7" />
        <line x1="36" y1="18" x2="36" y2="180" stroke="#3D73FF" stroke-width="3" filter="url(#blueGlow)" />
      </g>

      <!-- Monolith 2: 2017 CONTROL -->
      <g transform="translate(560, 300)">
        <polygon points="30,15 90,0 90,140 30,155" fill="url(#monolithGrad)" stroke="url(#chromeEdge)" stroke-width="2.2" />
        <polygon points="0,30 30,15 30,155 0,170" fill="#171e28" opacity="0.85" stroke="url(#chromeEdge)" stroke-width="1.8" />
        <polygon points="0,30 30,15 90,0 60,15" fill="#303b4d" opacity="0.65" />
        <line x1="30" y1="15" x2="30" y2="155" stroke="#3D73FF" stroke-width="2.5" filter="url(#blueGlow)" />
      </g>

      <!-- Monolith 3: 2021 REPORTING -->
      <g transform="translate(900, 200)">
        <polygon points="26,13 80,0 80,126 26,139" fill="url(#monolithGrad)" stroke="url(#chromeEdge)" stroke-width="2" />
        <polygon points="0,26 26,13 26,139 0,152" fill="#171e28" opacity="0.85" stroke="url(#chromeEdge)" stroke-width="1.5" />
        <polygon points="0,26 26,13 80,0 54,13" fill="#303b4d" opacity="0.6" />
        <line x1="26" y1="13" x2="26" y2="139" stroke="#3D73FF" stroke-width="2.2" filter="url(#blueGlow)" />
      </g>

      <!-- Monolith 4: 2023 FP&A -->
      <g transform="translate(1200, 120)">
        <polygon points="22,11 68,0 68,106 22,117" fill="url(#monolithGrad)" stroke="url(#chromeEdge)" stroke-width="1.8" />
        <polygon points="0,22 22,11 22,117 0,128" fill="#171e28" opacity="0.85" stroke="url(#chromeEdge)" stroke-width="1.4" />
        <polygon points="0,22 22,11 68,0 46,11" fill="#303b4d" opacity="0.6" />
        <line x1="22" y1="11" x2="22" y2="117" stroke="#3D73FF" stroke-width="2" filter="url(#blueGlow)" />
      </g>

      <!-- Monolith 5: 2025 FLOOSS (Beacon Future) -->
      <g transform="translate(1420, 60)">
        <polygon points="18,9 56,0 56,88 18,97" fill="url(#monolithGrad)" stroke="url(#chromeEdge)" stroke-width="2" />
        <polygon points="0,18 18,9 18,97 0,106" fill="#171e28" opacity="0.85" stroke="url(#chromeEdge)" stroke-width="1.5" />
        <polygon points="0,18 18,9 56,0 38,9" fill="#303b4d" opacity="0.6" />
        <line x1="18" y1="9" x2="18" y2="97" stroke="#77A1FF" stroke-width="3" filter="url(#blueGlow)" />
        <circle cx="28" cy="48" r="18" fill="#3D73FF" opacity="0.45" filter="url(#blueGlow)" />
        <circle cx="28" cy="48" r="6" fill="#F4F6F8" />
      </g>
    </svg>
  `;
  const outPath = path.join(targetDir, "career-orbit.webp");
  await sharp(Buffer.from(svg)).webp({ quality: 95 }).toFile(outPath);
  console.log("Recomposed:", outPath);
}

// 2. LAHORE ORIGIN (Compact, lower, darker smoked-glass & titanium financial blocks)
async function buildLahoreOrigin() {
  const width = 800;
  const height = 700;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="lahoreGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lahoreDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1c2533" stop-opacity="0.95" />
          <stop offset="60%" stop-color="#0e131b" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#06090e" stop-opacity="0.95" />
        </linearGradient>
      </defs>

      <!-- Isometric Cluster of Lower, Sturdy Financial Monoliths -->
      <!-- Monolith Left -->
      <g transform="translate(160, 320)">
        <polygon points="0,40 100,0 180,35 80,75" fill="#222d3e" opacity="0.9" stroke="#3D73FF" stroke-width="1.5" />
        <polygon points="0,40 80,75 80,240 0,205" fill="#131922" stroke="#245BFF" stroke-width="1" />
        <polygon points="80,75 180,35 180,200 80,240" fill="#090d13" stroke="#245BFF" stroke-width="1" />
      </g>

      <!-- Center Heavy Anchor -->
      <g transform="translate(280, 240)">
        <polygon points="0,50 140,0 240,40 100,90" fill="#2d3a4e" opacity="0.95" stroke="#77A1FF" stroke-width="2" />
        <polygon points="0,50 100,90 100,320 0,280" fill="#171f2b" stroke="#3D73FF" stroke-width="1.5" />
        <polygon points="100,90 240,40 240,270 100,320" fill="#0b0f15" stroke="#3D73FF" stroke-width="1.5" />
        <line x1="100" y1="90" x2="100" y2="320" stroke="#3D73FF" stroke-width="2.5" filter="url(#lahoreGlow)" />
      </g>

      <!-- Right Support -->
      <g transform="translate(460, 340)">
        <polygon points="0,35 90,0 160,30 70,65" fill="#222d3e" opacity="0.9" stroke="#3D73FF" stroke-width="1.5" />
        <polygon points="0,35 70,65 70,220 0,190" fill="#131922" stroke="#245BFF" stroke-width="1" />
        <polygon points="70,65 160,30 160,185 70,220" fill="#090d13" stroke="#245BFF" stroke-width="1" />
      </g>
    </svg>
  `;
  const outPath = path.join(targetDir, "lahore-origin.webp");
  await sharp(Buffer.from(svg)).webp({ quality: 95 }).toFile(outPath);
  console.log("Created:", outPath);
}

// 3. RIYADH DESTINATION (Taller, brighter, sophisticated financial architecture with luminous blue spires)
async function buildRiyadhDestination() {
  const width = 800;
  const height = 900;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="riyadhGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" result="blur1" />
          <feGaussianBlur stdDeviation="6" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="pylonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3D73FF" stop-opacity="0.85" />
          <stop offset="30%" stop-color="#1e2c44" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0b1118" stop-opacity="0.95" />
        </linearGradient>
      </defs>

      <!-- Center Monumental Pylon Tower (Reaching high) -->
      <g transform="translate(320, 100)">
        <polygon points="0,60 80,0 160,40 80,100" fill="#3D73FF" opacity="0.6" stroke="#77A1FF" stroke-width="2" />
        <polygon points="0,60 80,100 80,680 0,640" fill="url(#pylonGrad)" stroke="#3D73FF" stroke-width="2" />
        <polygon points="80,100 160,40 160,620 80,680" fill="#0c121b" stroke="#3D73FF" stroke-width="1.5" />
        <line x1="80" y1="100" x2="80" y2="680" stroke="#77A1FF" stroke-width="3" filter="url(#riyadhGlow)" />
        <circle cx="80" cy="100" r="16" fill="#3D73FF" opacity="0.6" filter="url(#riyadhGlow)" />
        <circle cx="80" cy="100" r="5" fill="#F4F6F8" />
      </g>

      <!-- Left Flanking Spire -->
      <g transform="translate(180, 220)">
        <polygon points="0,50 60,0 120,35 60,85" fill="#245BFF" opacity="0.5" stroke="#3D73FF" stroke-width="1.8" />
        <polygon points="0,50 60,85 60,540 0,505" fill="url(#pylonGrad)" stroke="#245BFF" stroke-width="1.5" />
        <polygon points="60,85 120,35 120,490 60,540" fill="#090f17" stroke="#245BFF" stroke-width="1.5" />
        <line x1="60" y1="85" x2="60" y2="540" stroke="#3D73FF" stroke-width="2" filter="url(#riyadhGlow)" />
      </g>

      <!-- Right Flanking Spire -->
      <g transform="translate(480, 260)">
        <polygon points="0,45 65,0 130,30 65,75" fill="#245BFF" opacity="0.5" stroke="#3D73FF" stroke-width="1.8" />
        <polygon points="0,45 65,75 65,500 0,470" fill="url(#pylonGrad)" stroke="#245BFF" stroke-width="1.5" />
        <polygon points="65,75 130,30 130,455 65,500" fill="#090f17" stroke="#245BFF" stroke-width="1.5" />
        <line x1="65" y1="75" x2="65" y2="500" stroke="#3D73FF" stroke-width="2" filter="url(#riyadhGlow)" />
      </g>
    </svg>
  `;
  const outPath = path.join(targetDir, "riyadh-destination.webp");
  await sharp(Buffer.from(svg)).webp({ quality: 95 }).toFile(outPath);
  console.log("Created:", outPath);
}

// 4. AUDIT CORE OPEN (Outer panels rotated open revealing glowing ledger matrix)
async function buildAuditCoreOpen() {
  const width = 800;
  const height = 800;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2a3547" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0a1017" stop-opacity="0.95" />
        </linearGradient>
      </defs>

      <!-- Inner Glowing Matrix Core (Exposed Ledger) -->
      <g transform="translate(400, 400)">
        <!-- Internal Glowing Cube -->
        <polygon points="0,-120 100,-60 100,60 0,120 -100,60 -100,-60" fill="#0d1829" stroke="#3D73FF" stroke-width="3" filter="url(#coreGlow)" />
        <polygon points="0,-120 100,-60 0,0 -100,-60" fill="#1b2a45" opacity="0.9" />
        <line x1="0" y1="0" x2="0" y2="120" stroke="#77A1FF" stroke-width="3" filter="url(#coreGlow)" />
        
        <!-- Internal Calculation Lattice -->
        <circle cx="0" cy="0" r="32" fill="#3D73FF" opacity="0.4" filter="url(#coreGlow)" />
        <circle cx="0" cy="0" r="10" fill="#F4F6F8" />
        <line x1="-70" y1="-20" x2="70" y2="-20" stroke="#3D73FF" stroke-width="1.5" />
        <line x1="-70" y1="20" x2="70" y2="20" stroke="#3D73FF" stroke-width="1.5" />
        <line x1="-50" y1="60" x2="50" y2="60" stroke="#3D73FF" stroke-width="1.5" />
      </g>

      <!-- Outer Shell Left Panel (Rotated Outward Open) -->
      <g transform="translate(220, 360) rotate(-22)">
        <polygon points="0,-100 80,-50 80,110 0,60" fill="url(#panelGrad)" stroke="#3D73FF" stroke-width="2.2" opacity="0.9" />
        <line x1="0" y1="-100" x2="80" y2="-50" stroke="#77A1FF" stroke-width="2.5" filter="url(#coreGlow)" />
      </g>

      <!-- Outer Shell Right Panel (Rotated Outward Open) -->
      <g transform="translate(580, 360) rotate(22)">
        <polygon points="0,-50 80,-100 80,60 0,110" fill="url(#panelGrad)" stroke="#3D73FF" stroke-width="2.2" opacity="0.9" />
        <line x1="0" y1="-50" x2="80" y2="-100" stroke="#77A1FF" stroke-width="2.5" filter="url(#coreGlow)" />
      </g>
    </svg>
  `;
  const outPath = path.join(targetDir, "audit-core-open.webp");
  await sharp(Buffer.from(svg)).webp({ quality: 95 }).toFile(outPath);
  console.log("Created:", outPath);
}

// 5. TOOLKIT MINIATURES: CASHFLOW, POWER BI, BUDGET STACK
async function buildToolkitMiniatures() {
  // Cashflow Core
  const cashflowSvg = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="cfg" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8" /><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g transform="translate(200, 200)">
        <polygon points="0,-70 60,-35 60,35 0,70 -60,35 -60,-35" fill="#131c29" stroke="#3D73FF" stroke-width="2" filter="url(#cfg)" />
        <polygon points="0,-70 60,-35 0,0 -60,-35" fill="#263750" opacity="0.8" />
        <circle cx="0" cy="0" r="14" fill="#3D73FF" opacity="0.5" filter="url(#cfg)" />
        <circle cx="0" cy="0" r="4" fill="#F4F6F8" />
      </g>
    </svg>
  `;
  await sharp(Buffer.from(cashflowSvg)).webp({ quality: 95 }).toFile(path.join(targetDir, "cashflow-core.webp"));

  // Power BI Prism
  const powerbiSvg = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pbg" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8" /><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g transform="translate(200, 200)">
        <polygon points="0,-80 70,40 -70,40" fill="#172336" stroke="#245BFF" stroke-width="2.5" filter="url(#pbg)" />
        <polygon points="0,-80 70,40 0,15" fill="#2d4163" opacity="0.75" />
        <line x1="0" y1="-80" x2="0" y2="40" stroke="#77A1FF" stroke-width="2" filter="url(#pbg)" />
        <circle cx="0" cy="-10" r="5" fill="#F4F6F8" />
      </g>
    </svg>
  `;
  await sharp(Buffer.from(powerbiSvg)).webp({ quality: 95 }).toFile(path.join(targetDir, "powerbi-prism.webp"));

  // Budget Stack
  const budgetSvg = `
    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="bsg" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8" /><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g transform="translate(200, 240)">
        <!-- Layer 1 -->
        <polygon points="-70,0 0,-30 70,0 0,30" fill="#151e2b" stroke="#3D73FF" stroke-width="1.8" />
        <!-- Layer 2 -->
        <polygon points="-60,-25 0,-50 60,-25 0,0" fill="#1d2a3d" stroke="#245BFF" stroke-width="1.8" />
        <!-- Layer 3 -->
        <polygon points="-50,-50 0,-70 50,-50 0,-30" fill="#2a3d59" stroke="#77A1FF" stroke-width="2" filter="url(#bsg)" />
        <circle cx="0" cy="-50" r="4" fill="#F4F6F8" />
      </g>
    </svg>
  `;
  await sharp(Buffer.from(budgetSvg)).webp({ quality: 95 }).toFile(path.join(targetDir, "budget-stack.webp"));
  console.log("Toolkit miniatures generated!");
}

async function main() {
  await buildRecomposedCareerOrbit();
  await buildLahoreOrigin();
  await buildRiyadhDestination();
  await buildAuditCoreOpen();
  await buildToolkitMiniatures();
  console.log("All city, toolkit and decomposed assets ready!");
}

main().catch(console.error);
