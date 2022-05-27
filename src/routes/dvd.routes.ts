import { Router } from "express";
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
    verifyAdminPermission
  );
  routes.get("/");

  return routes;
};
