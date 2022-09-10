import { application, Express, Router } from "express";
import {
  listAreasController,
  listOneAreaController,
  listUsersInAreaController,
  createAreaController,
  deleteAreaController,
  updateAreaController,
} from "../../controllers/areas.controllers";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";
import isOwnerMiddleware from "../../middlewares/isOwner.middleware";

const routes = Router();

export const areasRoutes = () => {
  routes.get("/", authenticationMiddleware, listAreasController);
  routes.get("/:area_id", authenticationMiddleware, listOneAreaController);
  routes.get(
    "/:area_id/users",
    authenticationMiddleware,
    listUsersInAreaController
  );
  routes.post(
    "",
    authenticationMiddleware,
    isOwnerMiddleware,
    createAreaController
  );
  routes.delete(
    "/:area_id",
    authenticationMiddleware,
    isOwnerMiddleware,
    deleteAreaController
  );
  routes.patch(
    "/:area_id",
    authenticationMiddleware,
    isOwnerMiddleware,
    updateAreaController
  );

  return routes;
};
