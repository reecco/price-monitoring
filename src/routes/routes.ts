import { Router, Request, Response } from "express";
import { SaleCard } from "../@types";

import monitoring from "../scrape/monitor";
import { filterCards } from "../utils";
import { authorization as auth } from "../middlewares";

const router = Router();

router.get('/:hardware?/:name', auth, async (req: Request, res: Response) => {
  let { name, hardware } = req.params;

  name = name.replace(/[ -]|%20/g, '+');
  hardware = hardware.replace(/[ -]|%20/g, '+');

  const results = await monitoring(name);

  const filteredCards: SaleCard[] = filterCards(results);

  if (filteredCards.length == 0) {
    return res.status(404).json({
      message: `${name} not found.`,
      code: 404,
      timestamp: Date.now()
    });
  }

  return res.status(200).json({
    timestamp: Date.now(),
    params: { hardware, name },
    results: filteredCards,
    code: 200
  });
});

export default router;