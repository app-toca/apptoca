import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";

export const getAllUsersService = async () => {
  const usersRepository = AppDataSource.getRepository(User);

  const users = await usersRepository.find();

  return users;
};
