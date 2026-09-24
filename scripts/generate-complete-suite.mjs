import sharp from "sharp";
import path from "path";
import fs from "fs";

const brainDir = "C:/Users/Usman Farooqi/.gemini/antigravity-ide/brain/21f796bf-23a9-4fea-8658-dc15ec89d800";
const targetDir = "d:/Projects/Sameer Majeed Portfolio/public/assets/3d";

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function makeTransparent(inputPath, outputPath, options = {}) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const thresholdLow = options.thresholdLow ?? 12;
  const thresholdHigh = options.thresholdHigh ?? 45;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const maxVal = Math.max(r, g, b);

    if (maxVal < thresholdLow) {
      data[i + 3] = 0;
    } else if (maxVal < thresholdHigh) {
      const alphaFactor = (maxVal - thresholdLow) / (thresholdHigh - thresholdLow);
      data[i + 3] = Math.round(data[i + 3] * alphaFactor);
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .webp({ quality: 95, effort: 6 })
    .toFile(outputPath);

  console.log(`Created: ${outputPath}`);
}

async function buildCareerOrbit() {
  // Create a 1600x800 transparent canvas with five floating smoked-glass/titanium monoliths in perspective,
  // connected by a luminous electric blue ribbon
  const width = 1600;
  const height = 800;

  // Use SVG overlay for precision vector ribbon with cobalt glow, combined with rendered 3D elements
  const ribbonSvg = `
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
          <stop offset="0%" stop-color="#172b6b" stop-opacity="0.8" />
          <stop offset="25%" stop-color="#245BFF" stop-opacity="0.95" />
          <stop offset="70%" stop-color="#3D73FF" stop-opacity="1" />
          <stop offset="100%" stop-color="#77A1FF" stop-opacity="0.9" />
        </linearGradient>
        <linearGradient id="monolithGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2a3342" stop-opacity="0.9" />
          <stop offset="40%" stop-color="#121720" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#080b10" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="chromeEdge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3D73FF" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#AAB1BC" stop-opacity="0.7" />
          <stop offset="100%" stop-color="#245BFF" stop-opacity="0.4" />
        </linearGradient>
      </defs>

      <!-- Connecting Luminous 3D Ribbon -->
      <path d="M 120,620 C 320,610 400,490 560,460 C 720,430 800,310 980,270 C 1140,230 1260,150 1480,130"
            fill="none" stroke="url(#ribbonGrad)" stroke-width="12" filter="url(#blueGlow)" stroke-linecap="round" />
      <path d="M 120,620 C 320,610 400,490 560,460 C 720,430 800,310 980,270 C 1140,230 1260,150 1480,130"
            fill="none" stroke="#F4F6F8" stroke-width="2.5" opacity="0.85" stroke-linecap="round" />

      <!-- Monolith 1: 2014 (Forefront, largest) -->
      <g transform="translate(80, 480)">
        <polygon points="40,20 120,0 120,180 40,200" fill="url(#monolithGrad1)" stroke="url(#chromeEdge)" stroke-width="2.5" />
        <polygon points="0,40 40,20 40,200 0,220" fill="#171e28" opacity="0.8" stroke="url(#chromeEdge)" stroke-width="2" />
        <polygon points="0,40 40,20 120,0 80,20" fill="#303b4d" opacity="0.6" />
        <line x1="40" y1="20" x2="40" y2="200" stroke="#3D73FF" stroke-width="3" filter="url(#blueGlow)" />
      </g>

      <!-- Monolith 2: 2017 -->
      <g transform="translate(480, 360)">
        <polygon points="32,16 96,0 96,150 32,166" fill="url(#monolithGrad1)" stroke="url(#chromeEdge)" stroke-width="2.2" />
        <polygon points="0,32 32,16 32,166 0,182" fill="#171e28" opacity="0.8" stroke="url(#chromeEdge)" stroke-width="1.8" />
        <polygon points="0,32 32,16 96,0 64,16" fill="#303b4d" opacity="0.6" />
        <line x1="32" y1="16" x2="32" y2="166" stroke="#3D73FF" stroke-width="2.5" filter="url(#blueGlow)" />
      </g>

      <!-- Monolith 3: 2021 -->
      <g transform="translate(860, 240)">
        <polygon points="26,13 80,0 80,126 26,139" fill="url(#monolithGrad1)" stroke="url(#chromeEdge)" stroke-width="2" />
        <polygon points="0,26 26,13 26,139 0,152" fill="#171e28" opacity="0.8" stroke="url(#chromeEdge)" stroke-width="1.5" />
        <polygon points="0,26 26,13 80,0 54,13" fill="#303b4d" opacity="0.6" />
        <line x1="26" y1="13" x2="26" y2="139" stroke="#3D73FF" stroke-width="2.2" filter="url(#blueGlow)" />
      </g>

      <!-- Monolith 4: 2023 -->
      <g transform="translate(1180, 150)">
        <polygon points="22,11 68,0 68,106 22,117" fill="url(#monolithGrad1)" stroke="url(#chromeEdge)" stroke-width="1.8" />
        <polygon points="0,22 22,11 22,117 0,128" fill="#171e28" opacity="0.8" stroke="url(#chromeEdge)" stroke-width="1.4" />
        <polygon points="0,22 22,11 68,0 46,11" fill="#303b4d" opacity="0.6" />
        <line x1="22" y1="11" x2="22" y2="117" stroke="#3D73FF" stroke-width="2" filter="url(#blueGlow)" />
      </g>

      <!-- Monolith 5: 2025 (Deepest, brightest beacon) -->
      <g transform="translate(1420, 70)">
        <polygon points="18,9 56,0 56,88 18,97" fill="url(#monolithGrad1)" stroke="url(#chromeEdge)" stroke-width="2" />
        <polygon points="0,18 18,9 18,97 0,106" fill="#171e28" opacity="0.8" stroke="url(#chromeEdge)" stroke-width="1.5" />
        <polygon points="0,18 18,9 56,0 38,9" fill="#303b4d" opacity="0.6" />
        <line x1="18" y1="9" x2="18" y2="97" stroke="#77A1FF" stroke-width="3" filter="url(#blueGlow)" />
        <circle cx="28" cy="48" r="16" fill="#3D73FF" opacity="0.4" filter="url(#blueGlow)" />
        <circle cx="28" cy="48" r="6" fill="#F4F6F8" />
      </g>
    </svg>
  `;

  const svgBuffer = Buffer.from(ribbonSvg);
  const outWebp = path.join(targetDir, "career-orbit.webp");

  await sharp(svgBuffer)
    .webp({ quality: 95, effort: 6 })
    .toFile(outWebp);

  console.log("Created:", outWebp);
}

async function buildReportingTower() {
  const width = 800;
  const height = 900;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blueGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="sheetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1f2937" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#0b1017" stop-opacity="0.95" />
        </linearGradient>
      </defs>

      <!-- 3 Layered Translucent Reporting Sheets in 3D Stagger -->
      <!-- Bottom Layer: Annual -->
      <g transform="translate(180, 480) rotate(-6)">
        <polygon points="0,60 360,0 480,180 120,240" fill="url(#sheetGrad)" stroke="#3D73FF" stroke-width="2" opacity="0.75" />
        <line x1="60" y1="80" x2="380" y2="28" stroke="#3D73FF" stroke-width="2" opacity="0.6" filter="url(#blueGlow)" />
        <line x1="80" y1="120" x2="400" y2="68" stroke="#AAB1BC" stroke-width="1" opacity="0.4" />
        <line x1="100" y1="160" x2="420" y2="108" stroke="#AAB1BC" stroke-width="1" opacity="0.4" />
      </g>

      <!-- Mid Layer: Quarterly -->
      <g transform="translate(150, 300) rotate(-3)">
        <polygon points="0,50 380,0 500,170 120,220" fill="url(#sheetGrad)" stroke="#245BFF" stroke-width="2.2" opacity="0.85" />
        <line x1="60" y1="70" x2="400" y2="22" stroke="#3D73FF" stroke-width="2.5" filter="url(#blueGlow)" />
        <line x1="80" y1="110" x2="420" y2="62" stroke="#F4F6F8" stroke-width="1.5" opacity="0.6" />
        <line x1="100" y1="150" x2="440" y2="102" stroke="#AAB1BC" stroke-width="1" opacity="0.4" />
      </g>

      <!-- Top Layer: Monthly (Forefront, clearest) -->
      <g transform="translate(120, 110)">
        <polygon points="0,40 400,0 520,160 120,200" fill="url(#sheetGrad)" stroke="#3D73FF" stroke-width="2.5" />
        <line x1="60" y1="60" x2="420" y2="16" stroke="#77A1FF" stroke-width="3" filter="url(#blueGlow)" />
        <line x1="80" y1="100" x2="440" y2="56" stroke="#F4F6F8" stroke-width="2" opacity="0.9" />
        <line x1="100" y1="140" x2="460" y2="96" stroke="#3D73FF" stroke-width="1.5" opacity="0.8" />
        <circle cx="280" cy="110" r="18" fill="#3D73FF" opacity="0.4" filter="url(#blueGlow)" />
        <circle cx="280" cy="110" r="6" fill="#F4F6F8" />
      </g>
    </svg>
  `;

  const svgBuffer = Buffer.from(svg);
  const outWebp = path.join(targetDir, "reporting-tower.webp");
  await sharp(svgBuffer).webp({ quality: 95, effort: 6 }).toFile(outWebp);
  console.log("Created:", outWebp);
}

async function buildForecastingCurve() {
  const width = 1000;
  const height = 700;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="curveGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="sculptureGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#101826" stop-opacity="0.9" />
          <stop offset="40%" stop-color="#1f2c42" stop-opacity="0.8" />
          <stop offset="80%" stop-color="#245BFF" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#77A1FF" stop-opacity="1" />
        </linearGradient>
      </defs>

      <!-- Aerodynamic 3D sweeping ribbon curve -->
      <path d="M 80,580 C 260,560 380,480 500,420 C 620,360 720,240 920,120 L 940,160 C 740,280 640,400 520,460 C 400,520 280,600 100,620 Z"
            fill="url(#sculptureGrad)" stroke="#3D73FF" stroke-width="2" opacity="0.85" />
      <path d="M 80,580 C 260,560 380,480 500,420 C 620,360 720,240 920,120"
            fill="none" stroke="#F4F6F8" stroke-width="3" filter="url(#curveGlow)" />
      <circle cx="920" cy="120" r="22" fill="#3D73FF" opacity="0.45" filter="url(#curveGlow)" />
      <circle cx="920" cy="120" r="7" fill="#F4F6F8" />
    </svg>
  `;
  const outWebp = path.join(targetDir, "forecasting-curve.webp");
  await sharp(Buffer.from(svg)).webp({ quality: 95, effort: 6 }).toFile(outWebp);
  console.log("Created:", outWebp);
}

async function buildCredentialPedestal() {
  const width = 800;
  const height = 900;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pedestalGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="16" result="blur1" />
          <feGaussianBlur stdDeviation="6" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="pedestalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2a3444" stop-opacity="0.9" />
          <stop offset="50%" stop-color="#121822" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#070a0e" stop-opacity="0.95" />
        </linearGradient>
        <linearGradient id="glassPlate" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3D73FF" stop-opacity="0.3" />
          <stop offset="30%" stop-color="#1f293d" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#3D73FF" stop-opacity="0.4" />
        </linearGradient>
      </defs>

      <!-- Floating Glass Backing Slab -->
      <g transform="translate(140, 80)">
        <polygon points="40,20 480,0 520,600 80,620" fill="url(#glassPlate)" stroke="#3D73FF" stroke-width="2" opacity="0.8" />
        <line x1="40" y1="20" x2="480" y2="0" stroke="#77A1FF" stroke-width="3" filter="url(#pedestalGlow)" opacity="0.9" />
        <line x1="520" y1="600" x2="80" y2="620" stroke="#245BFF" stroke-width="2.5" filter="url(#pedestalGlow)" opacity="0.7" />
        <!-- Corner precision clamps -->
        <rect x="25" y="10" width="30" height="20" rx="3" fill="#303b4d" stroke="#AAB1BC" stroke-width="1.5" />
        <rect x="470" y="-8" width="30" height="20" rx="3" fill="#303b4d" stroke="#AAB1BC" stroke-width="1.5" />
        <rect x="505" y="590" width="30" height="20" rx="3" fill="#303b4d" stroke="#AAB1BC" stroke-width="1.5" />
        <rect x="65" y="610" width="30" height="20" rx="3" fill="#303b4d" stroke="#AAB1BC" stroke-width="1.5" />
      </g>

      <!-- Minimalist Dark Titanium Floating Pedestal Base -->
      <g transform="translate(100, 680)">
        <!-- Lower Base Shadow / Glow -->
        <ellipse cx="300" cy="110" rx="280" ry="40" fill="#245BFF" opacity="0.25" filter="url(#pedestalGlow)" />
        
        <!-- Pedestal Tier 1 (Beveled Isometric Base) -->
        <polygon points="60,80 300,120 540,80 300,40" fill="url(#pedestalGrad)" stroke="#3D73FF" stroke-width="2.5" />
        <polygon points="60,80 300,120 300,150 60,110" fill="#0d121a" stroke="#245BFF" stroke-width="1.5" />
        <polygon points="300,120 540,80 540,110 300,150" fill="#06090e" stroke="#245BFF" stroke-width="1.5" />

        <!-- Pedestal Tier 2 (Upper Polished Plinth) -->
        <polygon points="120,60 300,90 480,60 300,30" fill="url(#pedestalGrad)" stroke="#77A1FF" stroke-width="2" />
        <line x1="120" y1="60" x2="300" y2="90" stroke="#F4F6F8" stroke-width="2" opacity="0.9" />
        <line x1="300" y1="90" x2="480" y2="60" stroke="#3D73FF" stroke-width="2" filter="url(#pedestalGlow)" />

        <!-- Central Luminous Neon Slot -->
        <polygon points="180,56 300,76 420,56 300,36" fill="#05080d" stroke="#3D73FF" stroke-width="1.5" />
        <line x1="200" y1="56" x2="400" y2="56" stroke="#77A1FF" stroke-width="3" filter="url(#pedestalGlow)" />
      </g>
    </svg>
  `;
  const outWebp = path.join(targetDir, "credential-pedestal.webp");
  await sharp(Buffer.from(svg)).webp({ quality: 95, effort: 6 }).toFile(outWebp);
  console.log("Created:", outWebp);
}

async function buildErpNetwork() {
  const width = 900;
  const height = 800;
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="erpGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cubeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#222d3d" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0a0f16" stop-opacity="0.95" />
        </linearGradient>
      </defs>

      <!-- Connecting Conduits -->
      <g stroke="#3D73FF" stroke-width="2" filter="url(#erpGlow)" opacity="0.8">
        <line x1="450" y1="400" x2="220" y2="280" />
        <line x1="450" y1="400" x2="680" y2="280" />
        <line x1="450" y1="400" x2="450" y2="620" />
        <line x1="220" y1="280" x2="320" y2="140" />
        <line x1="680" y1="280" x2="580" y2="140" />
      </g>

      <!-- Central Core Module -->
      <g transform="translate(450, 400)">
        <polygon points="0,-60 60,-25 60,45 0,10 -60,45 -60,-25" fill="url(#cubeGrad)" stroke="#3D73FF" stroke-width="2.5" />
        <polygon points="0,-60 60,-25 0,10 -60,-25" fill="#303e54" opacity="0.8" />
        <circle cx="0" cy="-5" r="16" fill="#3D73FF" opacity="0.5" filter="url(#erpGlow)" />
        <circle cx="0" cy="-5" r="6" fill="#F4F6F8" />
      </g>

      <!-- Peripheral Modules -->
      <g transform="translate(220, 280)">
        <polygon points="0,-45 45,-18 45,35 0,8 -45,35 -45,-18" fill="url(#cubeGrad)" stroke="#245BFF" stroke-width="2" />
        <polygon points="0,-45 45,-18 0,8 -45,-18" fill="#303e54" opacity="0.7" />
        <circle cx="0" cy="-5" r="4" fill="#3D73FF" />
      </g>

      <g transform="translate(680, 280)">
        <polygon points="0,-45 45,-18 45,35 0,8 -45,35 -45,-18" fill="url(#cubeGrad)" stroke="#245BFF" stroke-width="2" />
        <polygon points="0,-45 45,-18 0,8 -45,-18" fill="#303e54" opacity="0.7" />
        <circle cx="0" cy="-5" r="4" fill="#3D73FF" />
      </g>

      <g transform="translate(450, 620)">
        <polygon points="0,-45 45,-18 45,35 0,8 -45,35 -45,-18" fill="url(#cubeGrad)" stroke="#77A1FF" stroke-width="2" />
        <polygon points="0,-45 45,-18 0,8 -45,-18" fill="#303e54" opacity="0.7" />
        <circle cx="0" cy="-5" r="4" fill="#77A1FF" />
      </g>
    </svg>
  `;
  const outWebp = path.join(targetDir, "erp-network.webp");
  await sharp(Buffer.from(svg)).webp({ quality: 95, effort: 6 }).toFile(outWebp);
  console.log("Created:", outWebp);
}

async function convertJpgs() {
  await makeTransparent(
    path.join(brainDir, "audit_ledger_object_1789980974353.jpg"),
    path.join(targetDir, "audit-core.webp")
  );
  await makeTransparent(
    path.join(brainDir, "cash_flow_blocks_1789981132540.jpg"),
    path.join(targetDir, "control-engine.webp")
  );
  await makeTransparent(
    path.join(brainDir, "financial_planning_prism_1789981162758.jpg"),
    path.join(targetDir, "analysis-prism.webp")
  );
  await makeTransparent(
    path.join(brainDir, "glass_financial_structure_1789941866657.jpg"),
    path.join(targetDir, "planning-core.webp")
  );
}

async function main() {
  await buildCareerOrbit();
  await buildReportingTower();
  await buildForecastingCurve();
  await buildCredentialPedestal();
  await buildErpNetwork();
  await convertJpgs();
  console.log("Complete 3D asset suite generated successfully!");
}

main().catch(console.error);

