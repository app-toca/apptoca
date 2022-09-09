import { Request, Response } from "express";
import { listSchedulesByUserService } from "../../services/schedules/listSchedulesByUser.service";

export const listSchedulesByUserController = async(req: Request, res: Response) => {

    const { user_id } = req.params;
    
    const schedules = listSchedulesByUserService({ user_id });

    return res.status(200).json(schedules);

}