import { Router } from "express";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";
import {
  countUsersByHourController,
  createScheduleController,
  deleteSchedulesController,
  listSchedulesByAreaController,
  listSchedulesByDayAndHourController,
  listSchedulesByUserController,
  listSchedulesController,
  updateScheduleController,
} from "../../controllers/schedules.controllers";

const routes = Router();

export const schedulesRoutes = () => {
  routes.get("", isAdmMiddleware, listSchedulesController);
  routes.get(
    "/users/:user_id",
    authenticationMiddleware,
    listSchedulesByUserController
  );
  routes.get("/users/:area_id", isAdmMiddleware, listSchedulesByAreaController);
  routes.get(
    "/hours/days/areas/:day[0-6]/:hour/:area_id",
    isAdmMiddleware,
    listSchedulesByDayAndHourController
  );
  routes.get("/:area_id/report", isAdmMiddleware, countUsersByHourController);
  routes.post("", authenticationMiddleware, createScheduleController);
  routes.patch("", authenticationMiddleware, updateScheduleController);
  routes.delete("", authenticationMiddleware, deleteSchedulesController);

  return routes;
};
