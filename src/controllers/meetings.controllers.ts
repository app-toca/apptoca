import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { createMeetingService } from "../services/meetings/createMeeting.service";
import { deleteMeetingService } from "../services/meetings/deleteMeeting.service";
import { listAllMeetingsService } from "../services/meetings/listAllMeetings.service";
import { listMeetingsByAreaService } from "../services/meetings/listMeetingsByArea.service";
import { listOneMeetingService } from "../services/meetings/listOneMeeting.service";
import { updateMeetingService } from "../services/meetings/updateMeeting.service";

//Cria uma nova meeting

export const createMeetingController = async (req: Request, res: Response) => {
  const { area_id } = req.params;

  const { description, duration, ata, date_time } = req.body;

  const { id } = req.user;

  const meeting = await createMeetingService({
    area_id,
    ata,
    date_time,
    description,
    duration,
    id,
  });

  return res.status(201).json(instanceToPlain(meeting));
};

//Deleta uma meeting

export const deleteMeetingController = async (req: Request, res: Response) => {
  const { meeting_id } = req.params;

  const message = await deleteMeetingService({ meeting_id });

  return res.status(204).json({ message: message });
};

//Lista todas as meetings

export const listAllMeetingsController = async (
  req: Request,
  res: Response
) => {
  const { organization } = req.user;
  const meetings = await listAllMeetingsService(organization);

  return res.status(200).json(meetings);
};

//Lista todas as meetings de uma área

export const listMeetingsByAreaController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const meetings = await listMeetingsByAreaService({ id });

  return res.status(200).json(meetings);
};

//Lista uma meeting específica

export const listOneMeetingController = async (req: Request, res: Response) => {
  const { meeting_id } = req.params;

  const meeting = await listOneMeetingService({ meeting_id });

  return res.status(200).json(meeting);
};

//Atualiza uma meeting

export const updateMeetingController = async (req: Request, res: Response) => {
  const { description, date_time, duration, ata } = req.body;

  const { meeting_id } = req.params;

  const meeting = await updateMeetingService({
    meeting_id,
    description,
    date_time,
    duration,
    ata,
  });

  return res.status(200).json(meeting);
};
