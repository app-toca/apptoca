import { Router } from "express";
import {
  listOrganizationsController,
  listOneOrganizationController,
  createOrganizationController,
  updateOrganizationController,
} from "../../controllers/organizations.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import isOwnerMiddleware from "../../middlewares/isOwner.middleware";
import checkOrganizationMiddleware from "../../middlewares/checkOrganization.middleware";

const routes = Router();

export const organizationsRoutes = () => {
  routes.get("", listOrganizationsController);
  routes.get("/:org_id", listOneOrganizationController);
  routes.post("", createOrganizationController);
  routes.patch("/:org_id",
    authenticationMiddleware,
    isOwnerMiddleware,
    checkOrganizationMiddleware,
    updateOrganizationController
  );

  return routes
};
