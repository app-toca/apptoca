import AppDataSource from "../../data-source";
import { Image } from "../../entities/Image.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Organizations } from "../../entities/Organizations.entity";
import { Schedules } from "../../entities/Schedules.entity";
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

  const {
    password,
    ...rest
  } = userFind;

  return { ...rest };
};
