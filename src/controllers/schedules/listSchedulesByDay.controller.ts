import { Request, Response } from "express";
import { listSchedulesByDayService } from "../../services/schedules/listSchedulesByDay.service";

export const listSchedulesByDayController = async(req: Request, res: Response) => {

    const { day } = req.params;

    const schedules = await listSchedulesByDayService({ day });

    return res.status(200).json(schedules);

}