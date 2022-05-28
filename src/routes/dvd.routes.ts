import { Router } from "express";
import { dvdCreateController, dvdListController } from "../controllers/dvd";
import {
  validateSchema,
  verifyAdminPermission,
  verifyToken,
} from "../middlewares";
import { createDvdSchema } from "../schemas/dvd";

const routes = Router();

export const dvdRoutes = () => {
  routes.post(
    "/register",
    validateSchema(createDvdSchema),
    verifyToken,
    verifyAdminPermission,
    dvdCreateController
  );
  routes.get("/", dvdListController);

  return routes;
};
