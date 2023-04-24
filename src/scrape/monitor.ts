import { config } from "dotenv";

import { start } from ".";
import { SaleCard } from "../@types";

config();

async function monitoring(params: string): Promise<SaleCard[]> {
  const { browser, page } = await start();
  const urlBase = process.env.URL_BASE;
  const url = process.env.URL;

  await page.goto(`${urlBase}q=${params}${url}`);

  const results = await page.$$eval(".sh-dgr__content", (cards) => {
    const filterString = function (value: string): string | null {
      const regex = /(KaBuM!|Amazon.com.br|Pichau|Terabyteshop|Mercado Livre|Americanas.com|Casas Bahia|Magazine Luiza)/;
      const match = value.match(regex);

      return match ? match[0] : null;
    }

    return cards.map((card) => {
      const url = card.querySelector(".shntl div a[href]" as "a")?.href;
      const img = card.querySelector("img")?.src;
      const title = card.querySelector("h3")?.textContent;
      const price = card.querySelector(".a8Pemb" as "span")?.textContent;
      const seller = filterString(String(card.querySelector(".aULzUe" as "div")?.textContent));

      return {
        title: title ? title : null,
        img: img ? img : null,
        url: url ? url : null,
        price: price ? price : null,
        seller: seller ? seller : null
      }
    });
  });

  browser.close();
  return results;
}

export default monitoring;