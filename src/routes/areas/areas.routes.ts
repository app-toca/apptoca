import { application, Express } from "express";
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

export const areasRoutes = (app: Express) => {
  app.get("/areas", authenticationMiddleware, listAreasController);
  app.get("/areas/:area_id", authenticationMiddleware, listOneAreaController);
  app.get(
    "/areas/:area_id/users",
    authenticationMiddleware,
    listUsersInAreaController
  );
  app.post(
    "/areas",
    authenticationMiddleware,
    isOwnerMiddleware,
    createAreaController
  );
  app.delete(
    "/areas/:area_id",
    authenticationMiddleware,
    isOwnerMiddleware,
    deleteAreaController
  );
  app.patch(
    "/areas/:area_id",
    authenticationMiddleware,
    isOwnerMiddleware,
    updateAreaController
  );
};
