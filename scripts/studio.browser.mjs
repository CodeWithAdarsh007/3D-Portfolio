import assert from "node:assert/strict";
import { chromium } from "playwright-core";
import { preview } from "vite";

const server = await preview({ logLevel: "silent", preview: { host: "127.0.0.1", port: 0 } });
let browser;
try {
  browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || "chrome" });
  const url = server.resolvedUrls.local[0];
  for (const [width, height] of [[2560,1080], [1920,1080], [1440,900], [1366,768], [1280,720],
    [1024,768], [768,1024], [390,844], [375,812], [320,568]]) {
    const page = await browser.newPage({
      viewport: { width, height }, hasTouch: width <= 1024, reducedMotion: "reduce",
    });
    await page.goto(url);
    const art = page.locator(".studio-art");
    await art.evaluate(img => img.decode());
    const box = await art.boundingBox();
    const ratio = await art.evaluate(img => img.naturalWidth / img.naturalHeight);
    const size = `${width}×${height}`;
    assert.ok(box.y >= -1 && box.y + box.height <= height + 1, `${size}: scene clipped vertically`);
    assert.ok(box.x >= -1 && box.x + box.width <= width + 1, `${size}: scene clipped horizontally`);
    assert.ok(Math.abs(box.width / box.height - ratio) < 0.002, `${size}: desk changed proportions`);
    assert.deepEqual(await page.locator(".room-hero").boundingBox(), { x: 0, y: 0, width, height });

    // A large touch target for the keyboard once covered the envelope on phones.
    const blocked = await page.locator(".room-prop").evaluateAll(props => props.filter(prop => {
      const rect = prop.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
      return hit?.closest(".room-prop") !== prop;
    }).map(prop => prop.dataset.prop));
    assert.deepEqual(blocked, [], `${size}: inaccessible objects`);
    await page.goto(new URL("about", url).href);
    await page.locator("main h1").waitFor();
    const offscreen = await page.locator("header.fixed :is(a, button)").evaluateAll(items =>
      items.filter(item => {
        const rect = item.getBoundingClientRect();
        return rect.width && (rect.left < -1 || rect.right > innerWidth + 1);
      }).map(item => item.getAttribute("aria-label") || item.textContent)
    );
    assert.deepEqual(offscreen, [], `${size}: navigation outside viewport`);
    await page.close();
    console.log(size, "full desk and reachable objects");
  }

  const drop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  drop.on("pageerror", error => errors.push(error.message));
  const routeChecks = {
    monitor: "/#introduction", laptop: "/projects", chip: "/ai-lab", notebook: "/research",
    folder: "/projects/archive", idcard: "/about", trophy: "/achievements", envelope: "/contact",
  };
  for (const [prop, path] of Object.entries(routeChecks)) {
    await drop.goto(url);
    await drop.locator(".studio-art").waitFor();
    await drop.evaluate(() => {
      const camera = document.querySelector(".studio-surface");
      const animate = camera.animate.bind(camera);
      const pushState = history.pushState.bind(history);
      window.deskTiming = {};
      camera.animate = (...args) => {
        const motion = animate(...args);
        motion.addEventListener("finish", () => { window.deskTiming.finish = performance.now(); });
        return motion;
      };
      history.pushState = (...args) => {
        window.deskTiming.push = performance.now();
        return pushState(...args);
      };
    });
    await drop.locator(`[data-prop=${prop}]`).click();
    await drop.waitForURL(new URL(path, url).href);
    const { finish, push } = await drop.evaluate(() => window.deskTiming);
    assert.ok(push >= finish && push - finish < 100, `${prop}: navigation must follow camera completion`);
    if (prop === "monitor") assert.equal(await drop.locator(":focus").getAttribute("id"), "introduction");
    else await drop.locator("main[data-desk-arrival] .chapter-photo").waitFor();
    console.log(prop, "opened on animation completion");
  }
  await drop.goBack();
  await drop.locator(".studio-badge").waitFor();
  await drop.goForward();
  await drop.locator(".chapter-photo").waitFor();
  assert.equal(await drop.locator("main[data-desk-arrival]").count(), 0);
  await drop.goBack();
  await drop.locator(".studio-badge").waitFor();
  await drop.locator(".drawer-pull").click();
  await drop.getByRole("button", { name: "Pause room motion" }).click();
  const roomMotion = [".studio-badge", ".monitor-caret", ".chai-steam i"];
  for (const selector of roomMotion) {
    const playState = await drop.locator(selector).first().evaluate(element => getComputedStyle(element).animationPlayState);
    assert.equal(playState, "paused", `${selector}: room motion must pause`);
  }
  await drop.getByRole("button", { name: "Resume room motion" }).click();
  await drop.keyboard.press("Escape");
  await drop.emulateMedia({ reducedMotion: "reduce" });
  for (const selector of roomMotion) {
    const animation = await drop.locator(selector).first().evaluate(element => getComputedStyle(element).animationName);
    assert.equal(animation, "none", `${selector}: respect reduced motion`);
  }
  await drop.locator("[data-prop=idcard]").press("Enter");
  await drop.waitForURL(new URL("about", url).href);
  await drop.locator(".chapter-photo").waitFor();
  assert.equal(await drop.locator("main[data-desk-arrival]").count(), 0);
  assert.deepEqual(errors, []);
  console.log("Browser Back and Forward, motion controls and reduced-motion keyboard navigation passed");
} finally {
  await browser?.close();
  await server.close();
}
