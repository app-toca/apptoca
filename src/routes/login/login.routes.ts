import { Router } from "express";
import { changePasswordController, forgotPasswordController, loginController } from "../../controllers/login.controller";

const routes = Router();

export const loginRoutes = () => {
  routes.post("", loginController);
  routes.post("/forgot-password/:email", forgotPasswordController);
  routes.post("/change-password/:email", changePasswordController);

  return routes;
};
