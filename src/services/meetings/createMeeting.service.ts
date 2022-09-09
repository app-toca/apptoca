import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { IMeetingRequest } from "../../interfaces/meetings";

export const createMeetingService = async ({  area_id, ata, date_time, description, duration, user_id  }: IMeetingRequest): Promise<Meetings> => {

    const meetingRepository = AppDataSource.getRepository(Meetings);
    const areaRepository = AppDataSource.getRepository(Areas);
    const usersRepository = AppDataSource.getRepository(User);

    const user = await usersRepository.findOne({ where: { id: user_id } });
    
    if(!user){
        throw new AppError(404, "User not found!")
    }

    const area = await areaRepository.findOne({ where: { id: area_id } });

    if(!area){
        throw new AppError(404, "Area not found!")
    }

    const meeting = meetingRepository.create({ ata, date_time, description, duration, area, user });

    await meetingRepository.save(meeting);

    return meeting;
    
}