import { Request, Response } from "express";
import { listSchedulesByDayAndHourService } from "../../services/schedules/listSchedulesByDayAndHour.service";

export const listSchedulesByDayAndHourController = async(req: Request, res: Response) => {

    const { hour, day } = req.params;

    const schedules = await listSchedulesByDayAndHourService({ hour, day });

    return res.status(200).json(schedules);

}