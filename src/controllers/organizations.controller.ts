import { Request, Response } from "express";
import createOrganizationService from "../services/organizations/createOrganization.service";
import listOneOrganizationService from "../services/organizations/listOneOrganization.service";
import listOrganizationsService from "../services/organizations/listOrganizations.service";
import updateOrganizationService from "../services/organizations/updateOrganization.service";

const listOrganizations = async (req: Request, res: Response) => {
  const orgs = await listOrganizationsService();
  return res.status(200).json(orgs);
};

const listOneOrganization = async (req: Request, res: Response) => {
  const { org_id } = req.params;
  const org = await listOneOrganizationService(org_id);
  res.status(200).json(org);
};

const createOrganization = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const org = await createOrganizationService({ name, password });
  res.status(200).json(org);
};

const updateOrganization = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { org_id } = req.params;
  const org = await updateOrganizationService({ name, org_id });
  res.status(200).json(org);
};

export {
  listOrganizations,
  listOneOrganization,
  createOrganization,
  updateOrganization,
};