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
import checkOrganizationMiddleware from "../../middlewares/checkOrganization.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";
import isOwnerMiddleware from "../../middlewares/isOwner.middleware";

const routes = Router();

export const areasRoutes = () => {
  routes.get(
    "",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    listAreasController
  );

  routes.get(
    "/:area_id",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    listOneAreaController
  );
  routes.get(
    "/:area_id/users",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    listUsersInAreaController
  );
  routes.post(
    "",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    isOwnerMiddleware,
    createAreaController
  );
  routes.delete(
    "/:area_id",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    isOwnerMiddleware,
    deleteAreaController
  );
  routes.patch(
    "/:area_id",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    isOwnerMiddleware,
    updateAreaController
  );

  return routes;
};
