import { Router } from "express";
import {
  createAdministrationAreaRelationController,
  deleteAdministrationAreaRelationController,
} from "../../controllers/administrationAreaRelation.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import checkOrganizationMiddleware from "../../middlewares/checkOrganization.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";

const routes = Router();

export const administrationRoutes = () => {
  routes.post(
    "/area",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    isAdmMiddleware,
    createAdministrationAreaRelationController
  );
  routes.delete(
    "/area/:user_id/:area_id",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    isAdmMiddleware,
    deleteAdministrationAreaRelationController
  );

  return routes;
};
