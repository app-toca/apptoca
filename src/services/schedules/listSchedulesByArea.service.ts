import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Schedules } from "../../entities/Schedules.entity";

export const listSchedulesByAreaService = async(area_id: string) => {

    const areasRepository = AppDataSource.getRepository(Areas);

    const areaFounded = await areasRepository.findOne({where: { id: area_id }, relations: { area_user: true }, select: { area_user: true } } );

    console.log(areaFounded);
}