import AppDataSource from "../../data-source";
import { Meetings } from "../../entities/Meetings.entity";
import { AppError } from "../../error/global";

export const listAllMeetingsService = async (organization: string) => {
  const meetingsRepository = AppDataSource.getRepository(Meetings);

  const meetings = await meetingsRepository.find({
    where: { area: { organization: { id: organization } } },
  });

  if (!meetings) {
    return new AppError(404, "Meetings not found");
  }

  return meetings;
};
