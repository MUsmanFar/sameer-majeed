import { spawn } from "node:child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function runTest(url, testName, port) {
  console.log(`\n========================================`);
  console.log(`RUNNING: ${testName}`);
  console.log(`URL: ${url} (port ${port})`);
  console.log(`========================================`);

  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${port}`,
    "--headless=new",
    "--window-size=1440,900",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-background-networking",
    url,
  ]);

  let versionData = null;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
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
    throw new Error(`Failed to connect to Chrome debugging endpoint on port ${port}`);
  }

  const pagesRes = await fetch(`http://127.0.0.1:${port}/json/list`);
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

  // Track console errors
  const errors = [];
  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.method === "Runtime.consoleAPICalled" && data.params.type === "error") {
      errors.push(data.params.args.map((a) => a.value || a.description).join(" "));
    }
  });

  // Wait 3.5s for fonts, images, GSAP to settle
  await new Promise((r) => setTimeout(r, 3500));

  const triggerCheck = await send("Runtime.evaluate", {
    expression: `(() => {
      const st = window.ScrollTrigger;
      const all = st ? st.getAll() : [];
      return {
        totalTriggers: all.length,
        hasST: !!window.ScrollTrigger,
        scrollHeight: document.documentElement.scrollHeight,
        innerHeight: window.innerHeight,
        innerWidth: window.innerWidth,
      };
    })()`,
    returnByValue: true,
  });

  console.log("State at 0px:", triggerCheck.result?.value);

  const maxScroll = (await send("Runtime.evaluate", {
    expression: "document.documentElement.scrollHeight - window.innerHeight",
    returnByValue: true,
  })).result.value;

  // Forward scroll pass
  let forwardJumps = 0;
  const step = 250;
  for (let current = 0; current <= maxScroll; current += step) {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo(0, ${current});`,
    });
    await new Promise((r) => setTimeout(r, 35));

    const actualY = (await send("Runtime.evaluate", {
      expression: "window.scrollY",
      returnByValue: true,
    })).result.value;

    if (Math.abs(actualY - current) > 200) {
      forwardJumps++;
    }
  }

  // Reverse scroll pass
  let reverseJumps = 0;
  for (let current = maxScroll; current >= 0; current -= step) {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo(0, ${current});`,
    });
    await new Promise((r) => setTimeout(r, 35));

    const actualY = (await send("Runtime.evaluate", {
      expression: "window.scrollY",
      returnByValue: true,
    })).result.value;

    if (Math.abs(actualY - current) > 200) {
      reverseJumps++;
    }
  }

  // Explicitly scroll back to 0 at the end of reverse pass
  await send("Runtime.evaluate", {
    expression: "window.scrollTo(0, 0);",
  });
  await new Promise((r) => setTimeout(r, 100));

  // Verify final state back at 0
  const finalY = (await send("Runtime.evaluate", {
    expression: "window.scrollY",
    returnByValue: true,
  })).result.value;

  console.log(`Scroll Test Results:`);
  console.log(`- Forward Jumps: ${forwardJumps}`);
  console.log(`- Reverse Jumps: ${reverseJumps}`);
  console.log(`- Final Y: ${finalY}px (expected 0)`);
  console.log(`- Console Errors: ${errors.length}`);
  if (errors.length > 0) console.log("Errors:", errors);

  ws.close();
  chromeProc.kill();

  await new Promise((r) => setTimeout(r, 1000));

  return {
    totalTriggers: triggerCheck.result?.value?.totalTriggers || 0,
    scrollHeight: triggerCheck.result?.value?.scrollHeight || 0,
    forwardPass: forwardJumps === 0,
    reversePass: reverseJumps === 0 && finalY === 0,
    errorsCount: errors.length,
  };
}

async function main() {
  console.log("STARTING FULL SCROLL ENGINE AUTOMATED VALIDATION SUITE");

  // 1. Motion Test - Native
  const motionNative = await runTest(
    "http://localhost:3000/motion-test?noLenis=1&motionDebug=1",
    "1/4: /motion-test (Native Scroll)",
    9222
  );

  // 2. Motion Test - Lenis
  const motionLenis = await runTest(
    "http://localhost:3000/motion-test?motionDebug=1",
    "2/4: /motion-test (Lenis Smooth Scroll)",
    9223
  );

  // 3. Homepage - Native
  const homeNative = await runTest(
    "http://localhost:3000/?noLenis=1&motionDebug=1",
    "3/4: Homepage / (Native Scroll)",
    9224
  );

  // 4. Homepage - Lenis
  const homeLenis = await runTest(
    "http://localhost:3000/?motionDebug=1",
    "4/4: Homepage / (Lenis Smooth Scroll)",
    9225
  );

  console.log("\n========================================");
  console.log("FINAL AUDIT SCORECARD");
  console.log("========================================");
  console.log(`MOTION TEST: ${motionNative.forwardPass && motionLenis.forwardPass ? "PASS" : "FAIL"}`);
  console.log(`NATIVE SCROLL: ${motionNative.forwardPass && homeNative.forwardPass ? "PASS" : "FAIL"}`);
  console.log(`LENIS: ${motionLenis.forwardPass && homeLenis.forwardPass ? "PASS" : "FAIL"}`);
  console.log(`REVERSE SCROLL: ${motionNative.reversePass && homeNative.reversePass && homeLenis.reversePass ? "PASS" : "FAIL"}`);
  console.log(`HOMEPAGE TRANSFER: ${homeNative.forwardPass && homeLenis.forwardPass ? "PASS" : "FAIL"}`);
  console.log(`TOTAL SCROLLTRIGGERS: ${homeLenis.totalTriggers}`);
  console.log(`ERRORS DETECTED: ${homeLenis.errorsCount}`);
  console.log("========================================\n");
}

main();
