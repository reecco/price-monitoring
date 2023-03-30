import express, { Express } from "express";
import { config } from "dotenv";

import routes from "./src/routes";
import { access } from "./src/middlewares";

config();

const app: Express = express();
const port: string = process.env.PORT || '3000';

access(app);
routes(app);

app.listen(port, () => console.log(`http://localhost:${port}`));