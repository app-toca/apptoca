import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Area_users } from "../../entities/Area_users.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

const deleteAdministrationAreaRelationService = async (
  area_id: string,
  user_id: string
) => {
  const areaUsersRepository = await AppDataSource.getRepository(Area_users);
  const areaRepository = await AppDataSource.getRepository(Areas);
  const usersRepository = await AppDataSource.getRepository(User);

  const user = await usersRepository.findOneBy({
    id: user_id,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const area = await areaRepository.findOneBy({
    id: area_id,
  });

  if (!area) {
    throw new AppError(404, "Area not found");
  }

  const areaUserToBeDeleted = await areaUsersRepository.findOneBy({
    user: { id: user_id },
    area: { id: area_id },
  });

  if (!areaUserToBeDeleted) {
    throw new AppError(404, "Relation not found");
  }

  const deleted = await areaUsersRepository.remove(areaUserToBeDeleted);

  return deleted;
};

export default deleteAdministrationAreaRelationService;
