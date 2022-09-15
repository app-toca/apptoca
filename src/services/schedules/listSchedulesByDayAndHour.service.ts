import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { AppError } from "../../error/global";
import { ISchedulesRequest } from "../../interfaces/schedules";
import { desconstructUser } from "../../util/desconstruct";

export const listSchedulesByDayAndHourService = async( hour: string, day: number, area_id: string ) => {

    const areasRepository = AppDataSource.getRepository(Areas);
  const schedulesRepository = AppDataSource.getRepository(Schedules);

  const area = await areasRepository.findOneBy({id: area_id})

  if(!area) {
    throw new AppError(404, "Area not found")
  }

  const schedules = await schedulesRepository.find({
    where: { user: {area_user: { area: { id: area_id}}}, day: { name: day}, hour: { hour: hour} },
    relations: { user: true }
  });

  const cleanSchedules = schedules.map((sch) => {

    const user = desconstructUser(sch.user)
    
    return { ...sch, user}
  })

  return cleanSchedules;

}