import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { ISchedulesRequest } from "../../interfaces/schedules";

export const listSchedulesByUserService = async({ user_id }: ISchedulesRequest, is_adm: boolean, id: string) => {

    if(!is_adm && user_id !== id ) {

        throw new AppError(401, "Not authorized")

    }

    const userRepository = AppDataSource.getRepository(User);
    const schedulesRepository = AppDataSource.getRepository(Schedules)

    const userExists = userRepository.findOne({ where: { id: user_id } });

    if(!userExists){
        throw new AppError(404, "User not found!");
    }

    const schedules = await schedulesRepository.find({ where: { user: {id: user_id  }}, relations: {day: true, hour: true} });

    return schedules;

}