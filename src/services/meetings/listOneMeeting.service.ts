import AppDataSource from '../../data-source'
import { Meetings } from '../../entities/Meetings.entity'
import { AppError } from '../../error/global';
import { IOneMeetingRequest } from '../../interfaces/meetings'

export const listOneMeetingService = async ({ meeting_id }: IOneMeetingRequest) => {

    const meetingsRepository = AppDataSource.getRepository(Meetings);

    const meetings = await meetingsRepository.find();

    const meeting = meetings.find(mee => mee.id === meeting_id )

    if(!meeting) {
        throw new AppError(404, "Meeting not found")
    }

    return meeting;

}