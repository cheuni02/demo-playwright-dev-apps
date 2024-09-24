import {
  chromium,
  Browser,
  Page,
  BrowserContext,
  test as base,
} from "@playwright/test";

type TestFixtures = {
  pageChromium: Page;
  browserChromium: Browser;
  contextChromium: BrowserContext;
};

export const test = base.extend<TestFixtures>({
  browserChromium: async ({}, use) => {
    const browser = await chromium.launch();
    await use(browser);
    await browser.close();
  },

  contextChromium: async ({ browserChromium }, use) => {
    const context = await browserChromium.newContext();
    await use(context);
    await context.close();
  },

  pageChromium: async ({ contextChromium }, use) => {
    const page = await contextChromium.newPage();
    await use(page);
    await page.close();
  },
});

test.extend<{}, { forEachWorker: void }>({
  forEachWorker: [
    async ({}, use) => {
      // This code runs before all the tests in the worker process.
      console.log(`Starting test worker ${test.info().workerIndex}`);
      await use();
      // This code runs after all the tests in the worker process.
      console.log(`Stopping test worker ${test.info().workerIndex}`);
    },
    { scope: "worker", auto: true },
  ], // automatically starts for every worker.
});

export { expect } from "@playwright/test";
