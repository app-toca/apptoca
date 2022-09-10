import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

export const areasUserService = async (user_id: string, is_adm: boolean) => {
  const usersRepository = AppDataSource.getRepository(User);

  const findUser = await usersRepository.findOneBy({
    id: user_id,
  });

  if (!findUser) {
    throw new AppError(400, "Invalid Id");
  }

  if (is_adm === true || user_id === findUser?.id) {
    return findUser?.area_user;
  } else {
    throw new AppError(404, "Invalid User");
  }
};
