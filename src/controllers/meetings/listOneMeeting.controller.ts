import { Request, Response } from "express";
import { listOneMeetingService } from "../../services/meetings/listOneMeeting.service";

export const listOneMeetingController = async (req: Request, res: Response) => {

    const { id } = req.params;

    const meeting = listOneMeetingService({ id });

    return res.status(200).json(meeting)

}