import { Express } from "express";
import { dvdRoutes } from "./dvd.routes";
import { userRoutes } from "./user.routes";

export const appRoutes = (app: Express): void => {
  app.use("/api/users", userRoutes());
  app.use("/api/dvds", dvdRoutes());
};
