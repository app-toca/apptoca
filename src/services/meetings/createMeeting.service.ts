import AppDataSource from "../../data-source";
import { Meetings } from "../../entities/Meetings.entity";
import { IMeetingRequest } from "../../interfaces/meetings";

export const createMeetingService = async ({ description, duration, id, area_id }: IMeetingRequest) => {

    const meetingRepository = AppDataSource.getRepository(Meetings);

    const meeting = meetingRepository.create({ area: area_id, user: id, description: description, duration: duration });

    await meetingRepository.save(meeting);

    return meeting;
    
}