import { Request, Response } from "express";
import { updateMeetingService } from "../../services/meetings/updateMeeting.service";

export const updateMeetingController = async(req: Request, res: Response) => {

    const { description } = req.body;

    const { meeting_id } = req.params;

    const meeting = await updateMeetingService({ meeting_id, description });

    return res.status(200).json(meeting);

}