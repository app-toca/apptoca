import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Area_users } from "../../entities/Area_users.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

export const areasUserService = async (
  user_id: string,
  is_adm: boolean,
  id: string
) => {
  const usersRepository = AppDataSource.getRepository(User);
  const areaUsersRepository = AppDataSource.getRepository(Area_users);

  const findUser = await usersRepository.findOneBy({
    id: user_id,
  });

  if (!findUser) {
    throw new AppError(400, "Invalid Id");
  }

  if (!is_adm && id !== findUser?.id) {
    throw new AppError(403, "Invalid User");
  }

  const areasUser = await areaUsersRepository.find({
    where: {
      user: { id: user_id },
    },
  });

  const areas = areasUser.map((el) => {
    const { area, ...rest } = el;

    const { meetings, organization, ...aaa } = area;

    return { ...aaa };
  });

  return areas;
};
