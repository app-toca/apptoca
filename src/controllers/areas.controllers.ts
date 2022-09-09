import { Request, Response } from "express";
import createAreaService from "../services/areas/createArea.service";
import deleteAreaService from "../services/areas/deleteArea.service";
import listAreasService from "../services/areas/listAreas.service";
import listOneAreaService from "../services/areas/listOneArea.service";
import listUsersInAreaService from "../services/areas/listUsersInArea.service";
import updateAreaService from "../services/areas/updateArea.service";

const listAreasController = async (req: Request, res: Response) => {
  const { organization } = req.user;
  const areas = await listAreasService(organization);
  return res.status(200).json(areas);
};
//acesso : todo usuário logado

const listOneAreaController = async (req: Request, res: Response) => {
  const { area_id } = req.params;
  const area = await listOneAreaService(area_id);
  return res.status(200).json(area);
};
//acesso : todo usuário logado

const listUsersInAreaController = async (req: Request, res: Response) => {
  const { area_id } = req.params;
  const users = await listUsersInAreaService(area_id);
  return res.status(200).json(users);
};
//acesso : todo usuário logado

const createAreaController = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { organization } = req.user;
  const area = await createAreaService({ name, description, organization});
  return res.status(201).json(area);
};
//acesso : admins

const deleteAreaController = async (req: Request, res: Response) => {
  const { area_id } = req.params;
  await deleteAreaService(area_id);
  return res.status(204).send();
};
//acesso : admins

const updateAreaController = async (req: Request, res: Response) => {
  const { area_id, name, description } = req.params;
  const updatedArea = await updateAreaService({ area_id, name, description });
  return res.status(200).json(updatedArea);
};
//acesso : admins

export {
  listAreasController,
  listOneAreaController,
  listUsersInAreaController,
  createAreaController,
  deleteAreaController,
  updateAreaController,
};
