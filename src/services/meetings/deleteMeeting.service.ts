import AppDataSource from "../../data-source";
import { Meetings } from "../../entities/Meetings.entity";
import { IMeetingUpdateRequest } from "../../interfaces/meetings";

export const deleteMeetingService = async({ meeting_id }: IMeetingUpdateRequest) => {

    const meetingsRepository = AppDataSource.getRepository(Meetings);

    await meetingsRepository.createQueryBuilder().delete().where({
        id: meeting_id
    }).execute();

    return "Meeting deleted."

}