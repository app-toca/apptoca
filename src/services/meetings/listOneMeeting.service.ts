import AppDataSource from '../../data-source'
import { Meetings } from '../../entities/Meetings.entity'
import { IOneMeetingRequest } from '../../interfaces/meetings'

export const listOneMeetingService = async ({ id }: IOneMeetingRequest) => {

    const meetingsRepository = AppDataSource.getRepository(Meetings);

    const meeting = await meetingsRepository.findOne({ where: { id: id } });

    return meeting;

}