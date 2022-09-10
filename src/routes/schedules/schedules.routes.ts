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
  routes.get("/schedules", isAdmMiddleware, listSchedulesController);
  routes.get(
    "/schedules/users/:user_id",
    authenticationMiddleware,
    listSchedulesByUserController
  );
  routes.get(
    "/schedules/users/:area_id",
    isAdmMiddleware,
    listSchedulesByAreaController
  );
  routes.get(
    "/schedules/hours/days/areas/:day[0-6]/:hour/:area_id",
    isAdmMiddleware,
    listSchedulesByDayAndHourController
  );
  routes.get(
    "/schedules/:area_id/report",
    isAdmMiddleware,
    countUsersByHourController
  );
  routes.post("/schedules", authenticationMiddleware, createScheduleController);
  routes.patch(
    "/schedules",
    authenticationMiddleware,
    updateScheduleController
  );
  routes.delete(
    "/schedules",
    authenticationMiddleware,
    deleteSchedulesController
  );

  return routes;
};
