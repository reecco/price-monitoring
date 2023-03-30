import { Browser, Page } from "puppeteer"

export interface SaleCard {
  title: string | null,
  img: string | null,
  url: any,
  price: string | null,
  seller: string | null
}

export interface StartBrowser {
  browser: Browser,
  page: Page
}