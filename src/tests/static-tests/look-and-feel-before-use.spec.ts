import { test, expect } from "../fixtures";
// import { expect, chromium } from "@playwright/test";
const { describe, beforeAll, afterAll, beforeEach, afterEach } = test;

describe(" what should be seen when page is loaded", () => {
  beforeEach(async ({ pageChromium }) => {
    await pageChromium.goto("/todomvc");
  });
  test("has title 'todos'", async ({ pageChromium }) => {
    const header = await pageChromium.locator(".todoapp");
    await expect(header).toHaveText("todos");
  });

  test("has input box with placeholder text 'What needs to be done?'", async ({
    pageChromium,
  }) => {
    const inputBox = await pageChromium.locator("input.new-todo");
  });
});
