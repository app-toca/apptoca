import AppDataSource from "../../data-source";
import { Organizations } from "../../entities/Organizations.entity";
import { AppError } from "../../error/global";

const listOneOrganizationService = async (
  org_id: string
): Promise<Organizations> => {
  const organizationsRepository = AppDataSource.getRepository(Organizations);
  const org: Organizations | null = await organizationsRepository.findOne({
    where: { id: org_id },
  });
  if (!org) {
    throw new AppError(404, "Organization not found");
  }
  return org;
};
export default listOneOrganizationService;
