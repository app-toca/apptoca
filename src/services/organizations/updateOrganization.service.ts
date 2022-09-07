import { Organizations } from "../../entities/Organizations.entity";
import { iOrganizationUpdateRequest } from "../../interfaces/organizations";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";

const updateOrganizationService = async ({
  org_id,
  name,
}: iOrganizationUpdateRequest): Promise<Organizations> => {
  const organizationsRepository = AppDataSource.getRepository(Organizations);

  const org: Organizations | null = await organizationsRepository.findOne({
    where: { id: org_id },
  });

  if (!org) {
    throw new AppError(404, "Organization not found");
  }

  let orgUpdated: Organizations | null;

  try {
    orgUpdated = await organizationsRepository.save({ id: org_id, name: name });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  return orgUpdated;
};
export default updateOrganizationService;
