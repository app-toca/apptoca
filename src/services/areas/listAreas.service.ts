import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { AppError } from "../../error/global";

const listAreasService = async (organization: string): Promise<Areas[]> => {
  const areasRepository = AppDataSource.getRepository(Areas);
  let areas: Areas[];
  try {
    areas = await areasRepository.find({
      where: { organization_id: organization },
    });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }
  return areas;
};

export default listAreasService;
