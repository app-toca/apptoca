import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { IMeetingRequest } from "../../interfaces/meetings";
import { Image } from "../../entities/Image.entity";
import { Organizations } from "../../entities/Organizations.entity";

interface IMeeting {
  description?: string;
  date_time?: Date;
  duration?: string;
  ata?: string;
  user?: IUserMeetings;
  id?: string;
  created_at?: Date;
  area?: IAreaMeeting;
}

interface IUserMeetings {
  id: string;
  name?: string;
  email?: string;
  nickname?: string;
  age?: number;
  year?: number;
  course?: string;
  phrase?: string;
  is_adm?: boolean;
  img?: Image;
  is_owner?: boolean;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  organization?: Organizations;
  meetings?: Meetings[];
}

interface IAreaMeeting {
  id?: string;
  name?: string;
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
}: IMeetingRequest): Promise<IMeeting> => {
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

  delete me.user!.name;
  delete me.user!.email;
  delete me.user!.nickname;
  delete me.user!.age;
  delete me.user!.year;
  delete me.user!.course;
  delete me.user!.phrase;
  delete me.user!.is_adm;
  delete me.user!.is_active;
  delete me.user!.is_owner;
  delete me.user!.created_at;
  delete me.user!.updated_at;
  delete me.user!.organization;
  delete me.user!.img;
  delete me.area?.name;
  delete me.area?.description;
  delete me.area?.organization;
  delete me.area?.meetings;

  return me;
};
