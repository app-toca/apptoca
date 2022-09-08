import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

export const getAllUsersService = async () => {
  const usersRepository = AppDataSource.getRepository(User);

  const users = await usersRepository.find({
    select: {
      id: true,
      name: true,
      email: true,
      surname: true,
      age: true,
      year: true,
      course: true,
      is_active: true,
      is_adm: true,
      phrase: true,
    },
  });

  return users;
};
