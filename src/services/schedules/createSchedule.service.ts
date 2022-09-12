import AppDataSource from "../../data-source";
import { Days } from "../../entities/Days.entity";
import { Hours } from "../../entities/Hours.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { ISchedulesArray } from "../../interfaces/schedules";

export const createScheduleService = async (
  { schedules }: ISchedulesArray,
  user_id: string
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const usersRepository = AppDataSource.getRepository(User);
  const daysRepository = AppDataSource.getRepository(Days);
  const hoursRepository = AppDataSource.getRepository(Hours);

  const user = await usersRepository.findOne({ where: { id: user_id } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  schedules.forEach(async (scheduleInArray) => {
    const day = daysRepository.create({ name: scheduleInArray.day });
    await daysRepository.save(day);

    const hour = hoursRepository.create({ hour: scheduleInArray.hour });
    await hoursRepository.save(hour);

    const schedule = schedulesRepository.create({
      day: day,
      hour: hour,
      user: user,
    });
    await schedulesRepository.save(schedule);
  });

  const schedulesSaved = await schedulesRepository.find({
    relations: { user: false, day: true, hour: true },
    where: { user: { id: user.id } },
    select: { day: { name: true }, hour: { hour: true } },
  });

  const reqReturn = schedulesSaved.map((schedule) => {
    const { id, ...rest } = schedule;
    return rest;
  } );

  return reqReturn;
};
