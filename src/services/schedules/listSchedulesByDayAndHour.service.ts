import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { ISchedulesRequest } from "../../interfaces/schedules";

export const listSchedulesByDayAndHourService = async( hour: string, day: number ) => {

    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedules = schedulesRepository.find({ relations: { day: true, hour: true }, where: { 
        day: { name: day }, hour: { hour: hour }
     } })

     return schedules;

}