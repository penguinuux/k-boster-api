import { Router } from "express";
import {
  dvdBuyController,
  dvdCreateController,
  dvdListController,
} from "../controllers/dvd";
import {
  validateSchema,
  verifyAdminPermission,
  verifyDvdExists,
  verifyDvdUnicity,
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
    verifyDvdUnicity,
    dvdCreateController
  );
  routes.post("/buy/:dvdId", verifyToken, verifyDvdExists, dvdBuyController);
  routes.get("/", dvdListController);

  return routes;
};
