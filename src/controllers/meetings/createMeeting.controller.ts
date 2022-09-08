import { Request, Response } from "express";
import { createMeetingService } from "../../services/meetings/createMeeting.service";

export const createMeetingController = async(req: Request, res: Response) => {

    const { area_id } = req.params;

    const { description, duration } = req.body;

    const { id } = req.user;

    const meeting = await createMeetingService({ description, duration, id, area_id });

    return res.status(201).json(meeting);

}