import AppDataSource from "../../data-source";
import { Organizations } from "../../entities/Organizations.entity";
import { AppError } from "../../error/global";

const listOrganizationsService = async () => {
  const organizationsRepository = AppDataSource.getRepository(Organizations);
  let orgs: Organizations[];
  try {
    orgs = await organizationsRepository.find();
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }
  return orgs;
};
export default listOrganizationsService;
