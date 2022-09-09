import { Express, Router } from "express";
import { loginController } from "../../controllers/login.controller";

const routes = Router();

export const loginRoutes = () => {
  routes.post("/login", loginController);
  return routes;
};
