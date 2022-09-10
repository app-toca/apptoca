import { IUserUpdate } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

export const patchUserService = async (
  user_id: string,
  req: IUserUpdate,
  id: string,
  is_owner: boolean
) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userFind = await usersRepository.findOneBy({
    id: id,
  });

  if (!userFind) {
    throw new Error("User not exists");
  }

  if (is_owner === true || user_id === userFind?.id) {
    req.updated_at = new Date();

    await usersRepository.update(id, req);

    return req;
  } else {
    throw new AppError(404, "Invalid User");
  }
};
