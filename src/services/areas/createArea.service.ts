import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { AppError } from "../../error/global";
import { iAreaRequest } from "../../interfaces/areas";

interface IRequestAreaOrganization extends iAreaRequest {
  organization: string
}

const createAreaService = async ({
  name,
  description,
  organization,
}: IRequestAreaOrganization): Promise<Areas> => {
  const areasRepository = AppDataSource.getRepository(Areas);

  const areaAlreadyExists: Areas | null = await areasRepository.findOne({
    where: { name: name },
  });

  if (areaAlreadyExists) {
    throw new AppError(400, "Area already exists");
  }

  const area = new Areas();
  area.name = name;
  area.description = description;
  area.organization_id = organization;

  let areaCreated: Areas | null;

  try {
    areaCreated = await areasRepository.save(area);
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  return areaCreated;
};

export default createAreaService;
