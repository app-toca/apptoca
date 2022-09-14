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
    id: user_id,
  });

  if (!userFind) {
    throw new AppError(404, "User not exists");
  }

  if (!is_owner && req.is_adm) {
    throw new AppError(
      403,
      "You don't have permission to change the is_adm property"
    );
  }

  if (id !== userFind?.id && !is_owner) {
    throw new AppError(403, "You don't have permission to update this user");
  }

  if (
    is_owner &&
    id !== userFind?.id &&
    (Object.keys(req).length > 1 || !req.hasOwnProperty("is_adm"))
  ) {
    throw new AppError(
      403,
      "You don't have permission to change this properties of this user"
    );
  }

  if (req.email && req.email !== userFind.email) {
    throw new AppError(400, "You can't change the email");
  }

  if (req.hasOwnProperty("is_active")) {
    throw new AppError(
      403,
      "You can't change the property is_active in this route"
    );
  }

  if (req.password) {
    throw new AppError(403, "You can't change the password in this route");
  }

  await usersRepository.update(user_id, req);

  const { meetings, schedule, organization, password, ...rest } = userFind;

  return { ...req, ...rest };
};
