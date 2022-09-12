import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Schedules } from "../entities/Schedules.entity";
import { User } from "../entities/User.entity";
import { AppError } from "../error/global";

const updateSchedulesMiddlewares = async (req: Request, res: Response, next: NextFunction) => {
  const schedules = req.body;

  const user_id = req.user.id;

  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: user_id } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const schedulesFounded = await schedulesRepository.find({
    relations: { user: false, day: true, hour: true },
    where: { user: { id: user.id } },
    select: { day: { name: true }, hour: { hour: true } },
  });

  if (schedulesFounded.length === 0) {
    throw new AppError(404, "Schedules not founded for this user!");
  }

  await schedulesFounded.forEach((schedule) => {
    schedulesRepository
      .createQueryBuilder()
      .delete()
      .where({
        id: schedule.id,
      })
      .execute();
  });

  next();
};

export default updateSchedulesMiddlewares;
