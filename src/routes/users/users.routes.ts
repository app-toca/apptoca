import { Router } from "express";
import {
  createUserController,
  deleteuserController,
  getAllUsersController,
  getOneUserController,
  patchUserController,
} from "../../controllers/users.controller";

const routes = Router();

export const usersRoutes = () => {
  routes.post("/:organization_id/:password_org", createUserController);
  routes.get("", getAllUsersController);
  routes.get("/:id", getOneUserController);
  routes.delete("/:id", deleteuserController);
  routes.patch("/:id", patchUserController);

  return routes;
};
