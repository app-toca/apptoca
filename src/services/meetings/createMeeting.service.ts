import AppDataSource from "../../data-source";
import { Meetings } from "../../entities/Meetings.entity";
import { IMeetingRequest } from "../../interfaces/meetings";

export const createMeetingService = async ({ description, duration, ata, date_time }: IMeetingRequest, user_id:string, area_id:string) => {

    const meetingRepository = AppDataSource.getRepository(Meetings);

    //criar relacao do area_id e user_id 

    const meeting = meetingRepository.create({ description: description, duration: duration, ata: ata, date_time });

    await meetingRepository.save(meeting);

    return meeting;
    
}