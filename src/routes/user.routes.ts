import { Router } from "express";
import {
  userCreateController,
  userLoginController,
} from "../controllers/users";
import { validateSchema, verifyUserExists } from "../middlewares";
import { createUserSchema, userLoginSchema } from "../schemas/user";

const routes = Router();

export const userRoutes = () => {
  routes.post("/login", validateSchema(userLoginSchema), userLoginController);
  routes.post(
    "/register",
    validateSchema(createUserSchema),
    verifyUserExists,
    userCreateController
  );

  return routes;
};
