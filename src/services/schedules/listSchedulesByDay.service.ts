import AppDataSource from "../../data-source"
import { Schedules } from "../../entities/Schedules.entity"

export const listSchedulesByDayService = async( day: number) => {

    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedules = await schedulesRepository.find({ relations: { day: true }, where: { day: { name: day } } });

    return schedules;

}