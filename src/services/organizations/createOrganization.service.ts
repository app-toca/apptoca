import AppDataSource from "../../data-source";
import { Organizations } from "../../entities/Organizations.entity";
import { AppError } from "../../error/global";
import { iOrganizationRequest } from "../../interfaces/organizations";

const createOrganizationService = async ({
  name,
  password,
}: iOrganizationRequest): Promise<Organizations> => {
  const organizationsRepository = AppDataSource.getRepository(Organizations);

  const orgAlreadyexists: Organizations | null =
    await organizationsRepository.findOne({
      where: { name: name },
    });

  if (orgAlreadyexists) {
    throw new AppError(400, "Organization already exists");
  }

  const org = new Organizations();
  org.name = name;
  org.password = password;

  let orgCreated: Organizations | null;

  try {
    orgCreated = await organizationsRepository.save(org);
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  return orgCreated;
};
export default createOrganizationService;
