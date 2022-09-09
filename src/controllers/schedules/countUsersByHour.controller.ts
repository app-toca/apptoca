import { Request, Response } from "express";
import { countUsersByHourService } from "../../services/schedules/countUsersByHour.service";

export const countUsersByHourController = async(req: Request, res: Response) => {

    const { area_id } = req.params;

    const usersQuantity = countUsersByHourService({ area_id });

    return res.status(200).json(usersQuantity);

}