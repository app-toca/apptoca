import { Router } from "express";
import { countUsersByHourController, createScheduleController, deleteSchedulesController, listSchedulesByAreaController, listSchedulesByDayAndHourController, listSchedulesByUserController, listSchedulesController } from "../../controllers/schedules.controllers";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";
import updateSchedulesMiddlewares from "../../middlewares/updateSchedules.middleware";


const routes = Router();

export const schedulesRoutes = () => {
  routes.get("", authenticationMiddleware, isAdmMiddleware, listSchedulesController);
  routes.get("/users/:user_id", authenticationMiddleware,listSchedulesByUserController
  );
  routes.get("/areas/:area_id",authenticationMiddleware , isAdmMiddleware, listSchedulesByAreaController);
  routes.get(
    "/hours/days/areas/:day/:hour/:area_id",
    authenticationMiddleware,
    isAdmMiddleware,
    listSchedulesByDayAndHourController
  );
  routes.get("/:area_id/report", authenticationMiddleware, isAdmMiddleware, countUsersByHourController);
  routes.post("", authenticationMiddleware, createScheduleController);
  routes.patch("", authenticationMiddleware, updateSchedulesMiddlewares, createScheduleController);
  routes.delete("", authenticationMiddleware, deleteSchedulesController);

  return routes;
};
