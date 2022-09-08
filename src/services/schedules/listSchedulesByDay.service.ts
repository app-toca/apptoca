import AppDataSource from "../../data-source"
import { Schedules } from "../../entities/schedules.entity"
import { ISchedulesRequest } from "../../interfaces/schedules";

export const listSchedulesByDayService = async({ day }: ISchedulesRequest) => {

    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedules = await schedulesRepository.find({ relations: { day: true }, where: { day: { name: day } } });

    return schedules;

}