import AppDataSource from "../../data-source";
import { Meetings } from "../../entities/Meetings.entity";
import { IMeetingUpdateRequest } from "../../interfaces/meetings";

export const updateMeetingService = async({ meeting_id, description }: IMeetingUpdateRequest) => {

    const meetingsRepository = AppDataSource.getRepository(Meetings);

    const updatedMeeting = await meetingsRepository.createQueryBuilder().update().set({
        description: description
    }).where({
        id: meeting_id
    }).returning("*").execute();

    return updatedMeeting;

}
