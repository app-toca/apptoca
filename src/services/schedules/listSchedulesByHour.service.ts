import AppDataSource from "../../data-source";
import { Hours } from "../../entities/Hours.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { ISchedulesRequest } from "../../interfaces/schedules";

export const listSchedulesByHourService = async({ hour }: ISchedulesRequest) => {

    const schedulesRepository = AppDataSource.getRepository(Schedules);
    const hourRepository = AppDataSource.getRepository(Hours);

    const schedules = schedulesRepository.find({ relations: { hour: true }, where: { hour: { hour: hour } } });

    return schedules;

}