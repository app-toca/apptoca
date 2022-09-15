import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { IMeetingRequest } from "../../interfaces/meetings";
import { Image } from "../../entities/Image.entity";
import { Organizations } from "../../entities/Organizations.entity";
import { desconstructArea, desconstructUser } from "../../util/desconstruct";

interface IMeeting {
  description?: string;
  date_time?: Date;
  duration?: string;
  ata?: string;
  user: User;
  id?: string;
  created_at?: Date;
  area: Areas;
}

interface IMeetingRes {
  description?: string;
  date_time?: Date;
  duration?: string;
  ata?: string;
  user: IUserMeetings;
  id?: string;
  created_at?: Date;
  area: IAreaMeeting;
}

interface IUserMeetings {
  id: string;
  name?: string;
  email?: string;
  nickname?: string;
  img?: Image;
}

interface IAreaMeeting {
  id: string;
  name: string;
  description?: string;
  organization?: Organizations;
  meetings?: Meetings[];
}

export const createMeetingService = async ({
  area_id,
  ata,
  date_time,
  description,
  duration,
  id,
}: IMeetingRequest): Promise<IMeetingRes> => {
  const meetingRepository = AppDataSource.getRepository(Meetings);
  const areaRepository = AppDataSource.getRepository(Areas);
  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOne({ where: { id: id } });

  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const area = await areaRepository.findOne({ where: { id: area_id } });

  if (!area) {
    throw new AppError(404, "Area not found!");
  }

  const meeting = meetingRepository.create({
    ata,
    date_time,
    description,
    duration,
    area,
    user,
  });

  let me: IMeeting;

  await meetingRepository.save(meeting);

  me = meeting!;

  const userDes = desconstructUser(me.user)
  const areaDes = desconstructArea(me.area)
  return { ...me,user: userDes, area:areaDes}

};
