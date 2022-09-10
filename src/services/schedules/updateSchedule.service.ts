import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { ISchedulesArray } from "../../interfaces/schedules";

export const updateScheduleService = async (
  { schedules }: ISchedulesArray,
  user_id: string
) => {

    const schedulesRepository = AppDataSource.getRepository(Schedules);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id } });

    if(!user){
        throw new AppError(404, "User not found!")
    }

    const schedulesFounded = await schedulesRepository.find({ relations: { user: true }, where: { user: { id: user_id } } });

    if(!schedulesFounded){
        throw new AppError(404, "Schedules not founded for this user!");
    }

    const schedulesUpdated = await schedules.map(async(schedule, index) => {
        const scheduleUpdated = await schedulesRepository.createQueryBuilder().update().set({
            day: schedule.day.name?,
            hour: schedule.hour.hour?
        }).where({
            id: schedulesFounded[index].id
        }).returning("*").execute();
        return scheduleUpdated;
    });

    return schedulesUpdated;

};
