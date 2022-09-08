import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/schedules.entity";

export const countUsersByHourService = async ({ area_id }: any) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);

  const schedules = await schedulesRepository.find({
    relations: { user_id: { area_user: true } },
    where: { user_id: { area_user: { area: { id: area_id } } } },
  });

  const report = schedules.reduce((acc, schedule) => {});
};
