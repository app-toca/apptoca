import AppDataSource from "../../data-source"
import { Schedules } from "../../entities/schedules.entity";

export const listSchedulesService = async() => {

    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const schedules = schedulesRepository.find();

    return schedules;

}