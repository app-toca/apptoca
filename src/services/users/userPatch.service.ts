import { IUserUpdate } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

export const patchUserService = async (
  user_id: string,
  req: IUserUpdate,
  id: string,
  organization: string,
  is_owner: boolean
) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userFind = await usersRepository.findOneBy({
    id: id,
  });

  if (!userFind) {
    throw new Error("User not exists");
  }

  if (user_id !== userFind?.id || !is_owner || userFind.organization.id !== organization) {
    throw new AppError(403, "You don't have permission to update this user")
  }

    if(req.password) {
      throw new AppError(403, "You can't change the password in this route");
    }

    await usersRepository.update(id, req);

    return req;
};
