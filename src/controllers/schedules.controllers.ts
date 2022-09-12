import { Request, Response } from "express";
import { countUsersByHourService } from "../services/schedules/countUsersByHour.service";
import { createScheduleService } from "../services/schedules/createSchedule.service";
import { deleteSchedulesService } from "../services/schedules/deleteSchedules.service";
import { listSchedulesService } from "../services/schedules/listSchedules.service";
import { listSchedulesByAreaService } from "../services/schedules/listSchedulesByArea.service";
import { listSchedulesByDayAndHourService } from "../services/schedules/listSchedulesByDayAndHour.service";
import { listSchedulesByUserService } from "../services/schedules/listSchedulesByUser.service";
import { updateScheduleService } from "../services/schedules/updateSchedule.service";

//Retorna os usuário por hora contabilizados

export const countUsersByHourController = async (
  req: Request,
  res: Response
) => {
  const { area_id } = req.params;

  const usersQuantity = countUsersByHourService({ area_id });

  return res.status(200).json(usersQuantity);
};

//Lista todas as schedules

export const listSchedulesController = async (req: Request, res: Response) => {
  const schedules = await listSchedulesService();

  return res.status(200).json(schedules);
};

//Lista schedules por área

export const listSchedulesByAreaController = async (
  req: Request,
  res: Response
) => {
  const { area_id } = req.params;

  const schedules = await listSchedulesByAreaService({ area_id });

  return res.status(200).json(schedules);
};

//Lista schedules por dia e por hora

export const listSchedulesByDayAndHourController = async (
  req: Request,
  res: Response
) => {
  const { hour, day } = req.params;

  const schedules = await listSchedulesByDayAndHourService(hour, Number(day));

  return res.status(200).json(schedules);
};

//Lista as schedules por usuário

export const listSchedulesByUserController = async (
  req: Request,
  res: Response
) => {
  const { user_id } = req.params;

  const schedules = listSchedulesByUserService({ user_id });

  return res.status(200).json(schedules);
};

//Cria nova schedule

export const createScheduleController = async (req: Request, res: Response) => {
  const schedules = req.body;

  const user_id = req.user.id;

  const schedulesCreated = await createScheduleService({ schedules }, user_id);

  return res.status(201).json(schedulesCreated);
};

//Atualiza as schedules do usuário

export const updateScheduleController = async (req: Request, res: Response) => {
  const schedules = req.body;

  const user_id = req.user.id;

  const schedulesUpdated = await updateScheduleService({ schedules }, user_id);

  return res.status(200).json(schedulesUpdated);
};

//Deleta as schedules do usuário

export const deleteSchedulesController = async (
  req: Request,
  res: Response
) => {
  const user_id = req.user.id;

  const deleted = deleteSchedulesService(user_id);

  return res.status(200).json(deleted);
};
