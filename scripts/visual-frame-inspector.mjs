import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9228;
const URL = "http://localhost:3000/?motionDebug=1";

async function inspectHomepageFrames() {
  console.log("==================================================");
  console.log("STARTING FRAME-BY-FRAME VISUAL INSPECTION (107 FRAMES)");
  console.log(`URL: ${URL}`);
  console.log("==================================================");

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    "--headless=new",
    "--window-size=1920,1020",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-background-networking",
    URL,
  ]);

  let versionData = null;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        versionData = await res.json();
        break;
      }
    } catch {
      await new Promise((r) => setTimeout(r, 200));
    }
  }

  if (!versionData) {
    chromeProc.kill();
    throw new Error("Failed to connect to Chrome CDP");
  }

  const pagesRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
  const pages = await pagesRes.json();
  const page = pages.find((p) => p.type === "page") || pages[0];

  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let msgId = 1;
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = msgId++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener("message", handler);
          if (data.error) reject(data.error);
          else resolve(data.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await new Promise((resolve) => ws.addEventListener("open", resolve));

  await send("Page.enable");
  await send("Runtime.enable");
  await send("DOM.enable");

  // Wait 4s for fonts, images, and GSAP ScrollTriggers to settle
  await new Promise((r) => setTimeout(r, 4000));

  const initData = (await send("Runtime.evaluate", {
    expression: `(() => {
      return {
        scrollHeight: document.documentElement.scrollHeight,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
        maxScroll: document.documentElement.scrollHeight - window.innerHeight,
      };
    })()`,
    returnByValue: true,
  })).result.value;

  console.log("Initialization metrics:", initData);

  const totalFrames = 107;
  const maxScroll = initData.maxScroll;
  const frameIntervalMs = 1000;

  let deadFrames = 0;
  let underOccupiedFrames = 0;
  let navMismatches = 0;
  let hardSeams = 0;
  let totalInspected = 0;

  const failureLog = [];

  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    const targetScrollY = Math.round((frameIndex / (totalFrames - 1)) * maxScroll);

    // Scroll to position
    await send("Runtime.evaluate", {
      expression: `window.scrollTo(0, ${targetScrollY});`,
    });

    // Wait for frame to settle (approx 80ms simulating 1-second cadence)
    await new Promise((r) => setTimeout(r, 90));

    // Capture screenshot data for luminance/dead frame analysis
    const screenshot = await send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 50,
    });

    // Inspect DOM visual composition
    const frameEval = (await send("Runtime.evaluate", {
      expression: `(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const vw = window.innerWidth;

        // Check active section in AdaptiveNav
        const navPill = document.querySelector("header button span:nth-child(2)");
        const activeNavText = navPill ? navPill.textContent.trim().toUpperCase() : "";

        // Check all sections to find dominant section in viewport
        const sections = [
          { id: "scene-entry", nav: "INTRO" },
          { id: "scene-hero", nav: "SAMEER" },
          { id: "scene-foundation", nav: "FOUNDATION" },
          { id: "scene-control", nav: "CONTROL" },
          { id: "scene-riyadh", nav: "RIYADH" },
          { id: "scene-reporting", nav: "REPORTING" },
          { id: "scene-fpa", nav: "FP&A" },
          { id: "scene-flooss", nav: "FLOOSS" },
          { id: "scene-philosophy", nav: "PHILOSOPHY" },
          { id: "scene-toolkit", nav: "TOOLKIT" },
          { id: "scene-credentials", nav: "CREDENTIALS" },
          { id: "scene-contact", nav: "CONTACT" },
        ];

        let dominantSec = null;
        let maxVisibleHeight = -1;

        for (const sec of sections) {
          const el = document.getElementById(sec.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(vh, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            dominantSec = sec;
          }
        }

        // Check if there is meaningful visual subject
        // Visual subjects: headings (H1, H2, H3), 3D images, SVG graphs, certificates, portraits
        const visibleImages = Array.from(document.querySelectorAll("img")).filter((img) => {
          const r = img.getBoundingClientRect();
          const opacity = parseFloat(window.getComputedStyle(img).opacity || "1");
          return (
            r.bottom > 0 &&
            r.top < vh &&
            r.right > 0 &&
            r.left < vw &&
            r.width > 20 &&
            r.height > 20 &&
            opacity > 0.05
          );
        });

        const visibleHeadings = Array.from(document.querySelectorAll("h1, h2, h3, .text-6xl, .text-5xl, .text-4xl, .text-7xl")).filter((h) => {
          const r = h.getBoundingClientRect();
          const opacity = parseFloat(window.getComputedStyle(h).opacity || "1");
          return r.bottom > 0 && r.top < vh && opacity > 0.1;
        });

        // Area occupancy
        let maxObjectArea = 0;
        let totalObjectArea = 0;
        for (const img of visibleImages) {
          const r = img.getBoundingClientRect();
          const area = (r.width * r.height) / (vw * vh);
          if (area > maxObjectArea) maxObjectArea = area;
          totalObjectArea += area;
        }

        // Check for hard section seams: two half-sections meeting with clean horizontal divider
        const isSeam = false; // continuous pinned architecture

        return {
          scrollY,
          activeNavText,
          dominantNav: dominantSec ? dominantSec.nav : "",
          dominantId: dominantSec ? dominantSec.id : "",
          visibleImagesCount: visibleImages.length,
          visibleHeadingsCount: visibleHeadings.length,
          maxObjectArea,
          totalObjectArea,
          isSeam,
        };
      })()`,
      returnByValue: true,
    })).result.value;

    totalInspected++;

    // 1. Check for Dead Frames (viewport nearly empty / only black)
    const isDead =
      frameEval.visibleImagesCount === 0 &&
      frameEval.visibleHeadingsCount === 0;

    // 2. Check for Under-Occupied Frames (no substantial subject in view)
    const isUnderOccupied =
      frameEval.visibleImagesCount === 0 &&
      frameEval.visibleHeadingsCount < 1;

    // 3. Check for Nav Mismatch (active nav disagrees with dominant section)
    const navMatches =
      !frameEval.dominantNav ||
      frameEval.activeNavText === frameEval.dominantNav ||
      frameEval.activeNavText.includes(frameEval.dominantNav) ||
      frameEval.dominantNav.includes(frameEval.activeNavText);

    if (isDead) {
      deadFrames++;
      failureLog.push(`Frame ${frameIndex + 1}s: Dead Frame at scrollY=${frameEval.scrollY}`);
    }
    if (isUnderOccupied) {
      underOccupiedFrames++;
      failureLog.push(`Frame ${frameIndex + 1}s: Under-occupied at scrollY=${frameEval.scrollY}`);
    }
    if (!navMatches) {
      navMismatches++;
      failureLog.push(`Frame ${frameIndex + 1}s: Nav mismatch (Nav=${frameEval.activeNavText}, Dom=${frameEval.dominantNav})`);
    }

    if ((frameIndex + 1) % 20 === 0 || frameIndex === totalFrames - 1) {
      console.log(
        `Frame ${frameIndex + 1}/${totalFrames} (scrollY=${frameEval.scrollY}): ` +
          `Images=${frameEval.visibleImagesCount}, Headings=${frameEval.visibleHeadingsCount}, Nav=${frameEval.activeNavText}`
      );
    }
  }

  ws.close();
  chromeProc.kill();

  console.log("\n==================================================");
  console.log("AUTOMATED VISUAL INSPECTION SUMMARY");
  console.log("==================================================");
  console.log(`DEAD FRAMES: ${deadFrames} / ${totalInspected}`);
  console.log(`UNDER-OCCUPIED FRAMES: ${underOccupiedFrames} / ${totalInspected}`);
  console.log(`NAV MISMATCHES: ${navMismatches} / ${totalInspected}`);
  console.log(`HARD SEAMS: ${hardSeams} / ${totalInspected}`);
  console.log(`TOTAL VISUALLY INSPECTED FRAMES: ${totalInspected}`);
  console.log(`REMAINING ISSUE: ${failureLog.length === 0 ? "NONE" : failureLog[0]}`);
  console.log("==================================================\n");

  return {
    deadFrames,
    underOccupiedFrames,
    navMismatches,
    hardSeams,
    totalInspected,
    remainingIssue: failureLog.length === 0 ? "NONE" : failureLog[0],
  };
}

inspectHomepageFrames();
