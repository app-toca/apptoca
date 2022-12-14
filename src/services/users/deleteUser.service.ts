import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

export const deleteUserService = async (user_id: string, is_adm: boolean, id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userFind = await userRepository.findOneBy({ id: user_id });

  if (!userFind) {
    throw new AppError(404, "User not exists");
  }

  if (!is_adm && id !== userFind?.id) {
    throw new AppError(403, "Invalid User");
  }

  if (userFind.is_active === false) {
      throw new AppError(400, "User already deleted");
  }

  await userRepository.update(user_id, { is_active: false });

  } 
