import { Express, Request, Response, json } from "express";

import routes from "./routes";

export default (app: Express) => {
  app.route('/').get((req: Request, res: Response) => {
    res.status(200).json({
      code: 200
    });
  });

  app.use(
    json(),
    routes
  );
}