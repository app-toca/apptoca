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

  const schedulesSaved = await schedules.map(async (schedules, index) => {
    const day = await daysRepository.create({ name: schedules.day.name });
    const hour = await hoursRepository.create({ hour: schedules.hour.hour });
    const schedule = await schedulesRepository.create({ day, hour, user });

    await daysRepository.save(day);
    await hoursRepository.save(hour);
    await schedulesRepository.save(schedule);

    return schedule;
  });

  return schedulesSaved;
};
