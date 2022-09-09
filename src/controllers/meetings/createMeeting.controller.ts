import { Request, Response } from "express";
import { createMeetingService } from "../../services/meetings/createMeeting.service";

export const createMeetingController = async(req: Request, res: Response) => {

    const { area_id } = req.params;

    const { description, duration, ata, date_time} = req.body;

    const { id } = req.user;


    const meeting = await createMeetingService({ description, duration, ata, date_time }, id, area_id);

    return res.status(201).json(meeting);

}