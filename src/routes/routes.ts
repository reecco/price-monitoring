import { Router, Request, Response } from "express";

import monitoring from "../scrape/monitor";
import { filterCards } from "../utils";
import { SaleCard } from "../@types";
import { authorization as auth } from "../middlewares";

const router = Router();

router.post("/", auth, async (req: Request, res: Response) => {
  const name: string = req.body.name;

  if (!name)
    return res.status(400).json({ 
      message: "Invalid request.", 
      code: 400 
    });

  const nameReplaced = name.replace(/[ _-]/g, '+');

  const results: SaleCard[] = await monitoring(nameReplaced);

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
    prompt: nameReplaced,
    results: filteredCards,
    code: 200
  });
});

export default router;