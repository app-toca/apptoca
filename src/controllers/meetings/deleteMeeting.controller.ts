import { Request, Response } from "express";
import { deleteMeetingService } from "../../services/meetings/deleteMeeting.service";

export const deleteMeetingController = async(req: Request, res: Response) => {

    const { meeting_id } = req.params;

    const message = await deleteMeetingService({ meeting_id });

    return res.status(200).json({ message: message })

}