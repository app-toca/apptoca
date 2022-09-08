import { Organizations } from "../../entities/Organizations.entity";
import { iOrganizationUpdateRequest } from "../../interfaces/organizations";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";
import { UpdateResult } from "typeorm";

const updateOrganizationService = async ({
  org_id,
  name,
}: iOrganizationUpdateRequest): Promise<UpdateResult> => {
  const organizationsRepository = AppDataSource.getRepository(Organizations);

  const org: Organizations | null = await organizationsRepository.findOne({
    where: { id: org_id },
  });

  if (!org) {
    throw new AppError(404, "Organization not found");
  }

  let orgUpdated: UpdateResult | null;

  try {
    orgUpdated = await organizationsRepository.update(org_id, {
      name: name,
    });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  return orgUpdated;
};
export default updateOrganizationService;
