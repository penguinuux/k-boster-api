import express from "express";
import { appErrorMiddleware } from "./middlewares";
import { appRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(appErrorMiddleware);
appRoutes(app);

export default app;
