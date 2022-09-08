import { Request, Response } from "express";
import { listAllMeetingsService } from "../../services/meetings/listAllMeetings.service";

export const listAllMeetingsController = async (req: Request, res: Response) => {

    const meetings = await listAllMeetingsService()

    return res.status(200).json(meetings)
}