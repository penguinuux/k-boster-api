import { Router } from "express";
import { userCreateController, userLoginController } from "../controllers/user";
import { validateSchema, verifyUserExists } from "../middlewares";
import { verifyCreateAdminUserPermission } from "../middlewares";
import { createUserSchema, userLoginSchema } from "../schemas/user";

const routes = Router();

export const userRoutes = () => {
  routes.post("/login", validateSchema(userLoginSchema), userLoginController);
  routes.post(
    "/register",
    validateSchema(createUserSchema),
    verifyUserExists,
    verifyCreateAdminUserPermission,
    userCreateController
  );

  return routes;
};
