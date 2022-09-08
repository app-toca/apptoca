import { application, Express } from "express";
import {
  listAreasController,
  listOneAreaController,
  listUsersInAreaController,
  createAreaController,
  deleteAreaController,
  updateAreaController,
} from "../../controllers/areas.controllers";


export const areasRoutes = (app: Express) => {
  app.get("/areas", listAreasController);
  app.get("/areas/:area_id", listOneAreaController);
  app.get("/areas/:area_id/users", listUsersInAreaController);
  app.post("/areas", createAreaController);
  app.delete("/areas/:area_id", deleteAreaController);
  app.patch("/areas/:area_id", updateAreaController);
};
