import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../error/global";

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const userFind = users.find((user) => user.id === id);

  if (!userFind) {
    throw new AppError(404, "User not exists");
  }

  if (userFind.is_active === false) {
    throw new AppError(400, "User already deleted");
  }

  await userRepository.update(id, { is_active: false });
};
