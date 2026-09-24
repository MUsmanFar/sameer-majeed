import sharp from "sharp";
import path from "path";
import fs from "fs";

const brainDir = "C:/Users/Usman Farooqi/.gemini/antigravity-ide/brain/21f796bf-23a9-4fea-8658-dc15ec89d800";
const targetDir = "d:/Projects/Sameer Majeed Portfolio/public/assets/3d";

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const assets = [
  { src: "glass_financial_structure_1789941866657.jpg", dest: "hero-sculpture.png" },
  { src: "audit_ledger_object_1789980974353.jpg", dest: "foundation-ledger.png" },
  { src: "cash_flow_blocks_1789981132540.jpg", dest: "control-blocks.png" },
  { src: "financial_planning_prism_1789981162758.jpg", dest: "planning-prism.png" },
];

async function processAsset({ src, dest }) {
  const inputPath = path.join(brainDir, src);
  const outputPath = path.join(targetDir, dest);

  if (!fs.existsSync(inputPath)) {
    console.log("Source not found:", inputPath);
    return;
  }

  // Load raw image data
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;

  // Process pixels: calculate luminance. If very dark (< 15), alpha = 0. If between 15 and 45, smooth fade.
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const maxVal = Math.max(r, g, b);

    if (maxVal < 10) {
      data[i + 3] = 0; // completely transparent
    } else if (maxVal < 40) {
      const alphaFactor = (maxVal - 10) / 30;
      data[i + 3] = Math.round(data[i + 3] * alphaFactor);
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 8 })
    .toFile(outputPath);

  console.log(`Successfully generated transparent asset: ${dest}`);
}

for (const a of assets) {
  await processAsset(a);
}
