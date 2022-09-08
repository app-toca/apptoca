import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Area_users } from "../../entities/Area_users.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
const listUsersInAreaService = async (area_id: string): Promise<User[]> => {
  const areasRepository = AppDataSource.getRepository(Areas);

  const area = await areasRepository.findOne({
    relations: {
      area_user: {
        user: true,
      },
    },
    where: { id: area_id },
  });

  if (!area) {
    throw new AppError(404, "Area not found");
  }

  return area.area_user.user;
};

export default listUsersInAreaService;
