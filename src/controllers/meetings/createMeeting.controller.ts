import { Request, Response } from "express";
import { createMeetingService } from "../../services/meetings/createMeeting.service";

export const createMeetingController = async(req: Request, res: Response) => {

    const { description, duration } = req.body;

    const { id } = req.user.id;

    const meeting = createMeetingService();

    return res.status(201).json(meeting);

}