import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";
import { Areas } from "../../entities/Areas.entity";
import { DeleteResult } from "typeorm";

const deleteAreaService = async (id: string): Promise<DeleteResult> => {
  const areasRepository = AppDataSource.getRepository(Areas);

  const area: Areas | null = await areasRepository.findOne({
    where: { id: id },
  });

  if (!area) {
    throw new AppError(404, "Area not found");
  }
  let areaDeleted: DeleteResult;
  try {
    areaDeleted = await areasRepository.delete(area.id);
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  return areaDeleted;
};

export default deleteAreaService;
