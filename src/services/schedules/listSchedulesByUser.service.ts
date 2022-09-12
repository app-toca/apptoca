import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { ISchedulesRequest } from "../../interfaces/schedules";

export const listSchedulesByUserService = async({ user_id }: ISchedulesRequest) => {

    const userRepository = AppDataSource.getRepository(User);

    const userExists = userRepository.findOne({ where: { id: user_id } });

    if(!userExists){
        throw new AppError(404, "User not found!");
    }

    const schedules = await userRepository.find({ where: { id: user_id }, relations: { schedule: true } });

    return schedules;

}