import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { IReportSchedule } from "../../interfaces/schedules";

export const countUsersByHourService = async ({ area_id }: any) => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);

  const schedules = await schedulesRepository.find({
    relations: { user: { area_user: true } },
    where: { user: { area_user: { area: { id: area_id } } } },
  });

  const result = schedules.reduce((acc: IReportSchedule[], child) => {

    const indexFinded = acc.findIndex((el: IReportSchedule) => el.day == child.day.name && el.hour == child.hour.hour);

    const result: IReportSchedule = {}

    if(indexFinded == -1) {

        result.day = child.day.name;
        result.hour = child.hour.hour;
        result.qtt_users = 1;
        acc.push(result);

    } else {
        acc[indexFinded].qtt_users! += 1;
    }
    
    return acc;
}, []); 

return result;

}