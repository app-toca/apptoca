import { Request, Response } from "express";
import { listMeetingsByAreaService } from "../../services/meetings/listMeetingsByArea.service";

export const listMeetingsByAreaController = async (req: Request, res: Response) => {

    const { id } = req.params;

    const meetings = await listMeetingsByAreaService({ id });

    return res.status(200).json(meetings);

}