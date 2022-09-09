import { Express } from "express";
import {
  listOrganizationsController,
  listOneOrganizationController,
  createOrganizationController,
  updateOrganizationController,
} from "../../controllers/organizations.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import isOwnerMiddleware from "../../middlewares/isOwner.middleware";
import checkOrganizationMiddleware from "../../middlewares/checkOrganization.middleware";

export const organizationsRoutes = (app: Express) => {
  app.get("/organizations", listOrganizationsController);
  app.get("/organizations/:org_id", listOneOrganizationController);
  app.post("/organization", createOrganizationController);
  app.patch(
    "/organization/:org_id",
    authenticationMiddleware,
    isOwnerMiddleware,
    checkOrganizationMiddleware,
    updateOrganizationController
  );
};
