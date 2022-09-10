import AppDataSource from "../../data-source";
import { Days } from "../../entities/Days.entity";
import { Hours } from "../../entities/Hours.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { ISchedulesArray } from "../../interfaces/schedules";

export const updateScheduleService = async (
  { schedules }: ISchedulesArray,
  user_id: string
) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const userRepository = AppDataSource.getRepository(User);
  const daysRepository = AppDataSource.getRepository(Days);
  const hoursRepository = AppDataSource.getRepository(Hours);

  const user = await userRepository.findOne({ where: { id: user_id } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const schedulesFounded = await schedulesRepository.find({
    relations: { user: true },
    where: { user: { id: user_id } },
  });

  if (schedulesFounded.length === 0) {
    throw new AppError(404, "Schedules not founded for this user!");
  }

  // const schedulesUpdated = await schedules.map(async(schedule, index) => {
  //     const scheduleUpdated = await schedulesRepository.createQueryBuilder().update().set({
  //         day: schedule.day.name?,
  //         hour: schedule.hour.hour?
  //     }).where({
  //         id: schedulesFounded[index].id
  //     }).returning("*").execute();
  //     return scheduleUpdated;
  // });

  // return schedulesUpdated;

  await schedulesFounded.forEach((schedule) => {
    schedulesRepository
      .createQueryBuilder()
      .delete()
      .where({
        id: schedule.id,
      })
      .execute();
  });

  const schedulesCreated = await schedules.map(async (schedules) => {
    const day = await daysRepository.create({ name: schedules.day.name });
    const hour = await hoursRepository.create({ hour: schedules.hour.hour });
    const schedule = await schedulesRepository.create({ day, hour, user });

    await daysRepository.save(day);
    await hoursRepository.save(hour);
    await schedulesRepository.save(schedule);

    return schedule;
  });

  return schedulesCreated;
};
