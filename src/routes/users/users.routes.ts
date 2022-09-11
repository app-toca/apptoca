import { Router } from "express";
import {
  areasUserController,
  createUserController,
  deleteuserController,
  getAllUsersController,
  getOneUserController,
  patchUserController,
} from "../../controllers/users.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import checkOrganizationMiddleware from "../../middlewares/checkOrganization.middleware";
import checkPasswordOrganizationMiddleware from "../../middlewares/checkPasswordOrganization.middleware";

const routes = Router();

export const usersRoutes = () => {
  routes.post("/:organization_id/:password_org", checkPasswordOrganizationMiddleware ,createUserController);
  routes.get("", authenticationMiddleware, getAllUsersController);
  routes.get("/:id", authenticationMiddleware, getOneUserController);
  routes.delete("/:user_id", authenticationMiddleware, checkOrganizationMiddleware, deleteuserController);
  routes.patch("/:user_id", authenticationMiddleware, patchUserController);
  routes.get("/:user_id/areas", authenticationMiddleware, areasUserController);

  return routes;
};
