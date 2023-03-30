import puppeteer from "puppeteer";

import { StartBrowser } from "../@types";

export async function start(): Promise<StartBrowser> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  return { browser, page }
}