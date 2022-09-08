import { IUserUpdate } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

export const patchUserService = async (id: string, req: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const userFind = users.find((user) => user.id === id);

  if (!userFind) {
    throw new Error("User not exists");
  }

  req.updated_at = new Date();

  await userRepository.update(id, req);

  return req;
};
