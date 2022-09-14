import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { IUsersInArea } from "../../interfaces/areas";

const listUsersInAreaService = async (
  area_id: string
): Promise<IUsersInArea[]> => {
  const areaRepository = await AppDataSource.getRepository(Areas);
  const usersRepository = await AppDataSource.getRepository(User);

  const area = await areaRepository.findOneBy({
    id: area_id,
  });

  if (!area) {
    throw new AppError(404, "Area not found");
  }

  const users = await usersRepository.find({
    relations: {
      area_user: true,
    },
    where: {
      area_user: {
        area: { id: area_id },
      },
    },
  });

  const a = users.map((user) => {
    const { id, nickname, is_adm, img } = user;
    const uss = { id, nickname, is_adm, img };
    return uss;
  });

  return a;
};

export default listUsersInAreaService;
