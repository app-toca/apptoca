import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { User } from "../../entities/User.entity";

export const listSchedulesService = async () => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  const schedulesByUser = users.map(async (user) => {
    const userFiltered = await userRepository.findOne({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        organization: {
          id: false,
          name: false,
          password: false,
        },
        schedule: {
          day: {
            name: true,
          },
          hour: {
            hour: true,
          },
        },
      },
    });
    return userFiltered;
  });

  const usersFiltered = await Promise.all(schedulesByUser);

  const usersFormated = usersFiltered.map(async (user) => {
    const schedulesData = await schedulesRepository.find({
      relations: { day: true, hour: true },
      where: { user: { id: user!.id } },
      select: { day: { name: true }, hour: { hour: true } },
    });

    const promise = await Promise.all(schedulesData);
    
    const data = {
      id: user?.id,
      name: user?.name,
      schedules: promise,
    };
    return data;
  });

  const final = await Promise.all(usersFormated);

  return final;
};
