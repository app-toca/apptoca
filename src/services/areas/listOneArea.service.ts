import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { AppError } from "../../error/global";

const listOneAreaService = async (area_id: string): Promise<Areas> => {
  const areasRepository = AppDataSource.getRepository(Areas);
  let area: Areas | null;
  try {
    area = await areasRepository.findOne({ where: { id: area_id } });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }
  if (!area) {
    throw new AppError(404, "Area not found");
  }
  return area;
};

export default listOneAreaService;
