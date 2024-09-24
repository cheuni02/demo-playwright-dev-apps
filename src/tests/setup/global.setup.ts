import { test as setup } from "@playwright/test";
import { chromium, firefox, webkit } from "playwright";

setup("setup test", async ({ page }) => {
  let browserChromium;
  let contextChromium;
  let pageChromium;

  browserChromium = await chromium.launch();
  contextChromium = await browserChromium.newContext();
  pageChromium = await contextChromium.newPage();
  await pageChromium.goto("/todomvc");
});
