import { Request, Response } from "express";
import { listSchedulesByAreaService } from "../../services/schedules/listSchedulesByArea.service";

export const listSchedulesByAreaController = async(req: Request, res: Response) => {

    const { area_id } = req.params;

    const schedules = await listSchedulesByAreaService({ area_id });

    return res.status(200).json(schedules);

}