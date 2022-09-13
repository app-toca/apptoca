import { Organizations } from "../../entities/Organizations.entity";
import { IOrganizationUpdateRequest } from "../../interfaces/organizations";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";
import { UpdateResult } from "typeorm";

const updateOrganizationService = async ({
  org_id,
  name,
}: IOrganizationUpdateRequest): Promise<Organizations> => {
  const organizationsRepository = AppDataSource.getRepository(Organizations);

  const org: Organizations | null = await organizationsRepository.findOne({
    where: { id: org_id },
  });

  if (!org) {
    throw new AppError(404, "Organization not found");
  }

  const orgAlreadyexists = await organizationsRepository.findOne({
    where: { name: name },
  });

  if (orgAlreadyexists) {
    throw new AppError(400, "This name already belongs to other organization");
  }

  let orgUpdated: UpdateResult | null;

  try {
    orgUpdated = await organizationsRepository.update(org_id, {
      name: name,
    });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  const orgUp = await organizationsRepository.findOne({
    where: { id: org_id },
  });

  return orgUp!;
};
export default updateOrganizationService;
