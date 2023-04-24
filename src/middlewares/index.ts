import { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";

config();

export function access(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET");
    cors();
    next();
  });
}

export function authorization(req: Request, res: Response, next: NextFunction): void {
  const sys = process.env.TOKEN;
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];

  if (!sys) {
    res.status(500).json({
      message: "Server authentication error.",
      code: 500
    });
    return;
  }

  if (token !== sys) {
    res.status(401).json({
      message: "Invalid token.",
      code: 401
    });
    return;
  }

  next();
}