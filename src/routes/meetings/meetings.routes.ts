import { Router } from "express";
import {
  createMeetingController,
  deleteMeetingController,
  listAllMeetingsController,
  listMeetingsByAreaController,
  listOneMeetingController,
  updateMeetingController,
} from "../../controllers/meetings.controllers";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import checkOrganizationMiddleware from "../../middlewares/checkOrganization.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";

const routes = Router();

export const meetingsRoutes = () => {
  routes.post(
    "/:area_id",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    isAdmMiddleware,
    createMeetingController
  );
  routes.get("", authenticationMiddleware, listAllMeetingsController);
  routes.get(
    "/:meeting_id",
    authenticationMiddleware,
    listOneMeetingController
  );
  routes.get(
    "/areas/:area_id",
    authenticationMiddleware,
    listMeetingsByAreaController
  );
  routes.patch(
    "/:meeting_id",
    authenticationMiddleware,
    isAdmMiddleware,
    updateMeetingController
  );
  routes.delete(
    "/:meeting_id",
    authenticationMiddleware,
    isAdmMiddleware,
    deleteMeetingController
  );

  return routes;
};
