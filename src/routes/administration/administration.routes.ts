import { Router } from "express";
import { createAdministrationAreaRelationController, deleteAdministrationAreaRelationController } from "../../controllers/administrationAreaRelation.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";


const routes = Router();

export const administrationRoutes = () => {
  routes.post("/area", authenticationMiddleware, isAdmMiddleware, createAdministrationAreaRelationController);
  routes.delete("/area/:user_id/:area_id", authenticationMiddleware, isAdmMiddleware, deleteAdministrationAreaRelationController);

  return routes;
};