import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Schedules } from "../../entities/schedules.entity";
import { AppError } from "../../error/global";
import { ISchedulesRequest } from "../../interfaces/schedules";

export const listSchedulesByAreaService = async({ area_id }: ISchedulesRequest) => {

    const areasRepository = AppDataSource.getRepository(Areas);
    const schedulesRepository = AppDataSource.getRepository(Schedules);

    const usersInArea = await areasRepository.findOne({ where: { id: area_id }, relations: { area_user: { user: true } } });

    if(!usersInArea) {
        throw new AppError(404, "Area not found!");
    }

    const schedules = usersInArea.area_user.user.map(user => { user.id, user.name, user.schedule });

    return schedules;

}