import { UpdateResult } from "typeorm";
import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { AppError } from "../../error/global";
import { iAreaUpdateRequest } from "../../interfaces/areas";

const updateAreaService = async ({
  area_id,
  name,
  description,
  organization,
}: iAreaUpdateRequest): Promise<Areas> => {
  const areaRepository = AppDataSource.getRepository(Areas);

  const area: Areas | null = await areaRepository.findOne({
    where: { id: area_id },
  });

  if (!area) {
    throw new AppError(404, "Area not found");
  }

  if (area.organization.id !== organization) {
    throw new AppError(401, "Unauthorized");
  }

  let areaUpdated: UpdateResult | null;

  try {
    areaUpdated = await areaRepository.update(area.id, {
      name: name ? name : area.name,
      description: description ? description : area.description,
    });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  const areaUpdatedd: Areas | null = await areaRepository.findOne({
    where: { id: area_id },
  });

  if (!areaUpdatedd) {
    throw new AppError(404, "Area not found");
  }

  return areaUpdatedd;
};
export default updateAreaService;
