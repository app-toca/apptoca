import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { AppError } from "../../error/global";
import { iAreaUpdateRequest } from "../../interfaces/areas";

const updateAreaService = async ({
  area_id,
  name,
  description,
}: iAreaUpdateRequest): Promise<Areas> => {
  const areaRepository = AppDataSource.getRepository(Areas);

  const area: Areas | null = await areaRepository.findOne({
    where: { id: area_id },
  });

  !area &&
    (() => {
      throw new AppError(404, "Area not found");
    });

  let areaUpdated: Areas;

  if (name && description) {
    areaUpdated = await areaRepository.save({
      id: area_id,
      name: name,
      description: description,
    });
  }
  if (name && !description) {
    areaUpdated = await areaRepository.save({
      id: area_id,
      name: name,
    });
  }

  areaUpdated = await areaRepository.save({
    id: area_id,
    description: description,
  });

  return areaUpdated;
};
export default updateAreaService;
