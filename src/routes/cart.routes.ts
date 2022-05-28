import { Router } from "express";
import { orderCreateController } from "../controllers/order";
import { verifyToken } from "../middlewares";

const routes = Router();

export const cartRoutes = () => {
  routes.put("/pay", verifyToken, orderCreateController);

  return routes;
};
