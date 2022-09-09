import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

export const getOneUserService = async (id: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userFind = await usersRepository.findOneBy({
    id: id,
  });

  if (!userFind) {
    throw new AppError(404, "User Not found");
  }

  return userFind;
};
