import { Router } from "express";
import { createMeetingController } from "../../controllers/meetings/createMeeting.controller";
import { deleteMeetingController } from "../../controllers/meetings/deleteMeeting.controller";
import { listAllMeetingsController } from "../../controllers/meetings/listAllMeetings.controller";
import { listMeetingsByAreaController } from "../../controllers/meetings/listMeetingsByArea.controller";
import { listOneMeetingController } from "../../controllers/meetings/listOneMeeting.controller";
import { updateMeetingController } from "../../controllers/meetings/updateMeeting.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";

const routes = Router();

export const meetingsRoutes = () => {
  routes.post("/meetings/:area_id", authenticationMiddleware, createMeetingController);
  routes.get("/meetings", authenticationMiddleware, listAllMeetingsController);
  routes.get("/meetings/:meeting_id", authenticationMiddleware, listOneMeetingController);
  routes.get("/meetings/areas/:area_id", authenticationMiddleware, listMeetingsByAreaController);
  routes.patch("/meetings/:meeting_id", authenticationMiddleware, isAdmMiddleware, updateMeetingController);
  routes.delete("/meetings/:meeting_id", authenticationMiddleware, isAdmMiddleware, deleteMeetingController);

  return routes;
};
