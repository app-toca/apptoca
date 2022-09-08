import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { IOneMeetingRequest } from "../../interfaces/meetings";

export const listMeetingsByAreaService = async({ id }: IOneMeetingRequest) => {
    const areasRepository = AppDataSource.getRepository(Areas);

    const meetings = await areasRepository.findOne({ where: { id: id }, relations: { meetings: true } });

    return meetings;

}