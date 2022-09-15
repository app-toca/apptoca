import AppDataSource from "../../data-source";
import { Organizations } from "../../entities/Organizations.entity";
import { User } from "../../entities/User.entity";

export const getAllUsersService = async (id_organization: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const users = await usersRepository.find({
    where: {organization: { id: id_organization} }
  });

  return users;
};
