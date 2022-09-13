import AppDataSource from "../../data-source"
import { Schedules } from "../../entities/Schedules.entity";

export const listSchedulesService = async() => {
    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedules = await schedulesRepository.find({relations: {day: true, hour: true, user: true}});

    return schedules;

}