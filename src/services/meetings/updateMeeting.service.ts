import AppDataSource from "../../data-source";
import { Meetings } from "../../entities/Meetings.entity";
import { IMeetingUpdateRequest } from "../../interfaces/meetings";
import { AppError } from "../../error/global";

export const updateMeetingService = async ({
  meeting_id,
  description,
  date_time,
  ata,
  duration,
}: IMeetingUpdateRequest) => {
  const meetingsRepository = AppDataSource.getRepository(Meetings);
  const meeting = await meetingsRepository.findOneBy({ id: meeting_id });

  if (!meeting) {
    throw new AppError(404, "Meeting not found");
  }

  const aa = await meetingsRepository.update(meeting_id, {
    description: !description ? meeting?.description : description,
    date_time: date_time ? date_time : meeting?.date_time,
    ata: ata ? ata : meeting?.ata,
    duration: duration ? duration : meeting?.duration,
  });

  const me = await meetingsRepository.findOneBy({ id: meeting_id });

  return me;
};
