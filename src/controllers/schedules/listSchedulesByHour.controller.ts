import { Request, Response } from "express";
import { listSchedulesByHourService } from "../../services/schedules/listSchedulesByHour.service";

export const listSchedulesByHourController = async(req: Request, res: Response) => {

    const { hour } = req.params;

    const schedules = await listSchedulesByHourService({ hour });

    return res.status(200).json(schedules);

}