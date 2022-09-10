import AppDataSource from "../../data-source";
import { Schedules } from "../../entities/Schedules.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

export const deleteSchedulesService = async(user_id: string) => {

    const schedulesRepository = AppDataSource.getRepository(Schedules);
    const userRepository = AppDataSource.getRepository(User);
  
    const user = await userRepository.findOne({ where: { id: user_id } });
  
    if (!user) {
      throw new AppError(404, "User not found!");
    }
  
    const schedulesFounded = await schedulesRepository.find({
      relations: { user: true },
      where: { user: { id: user_id } },
    });
  
    if (schedulesFounded.length === 0) {
      throw new AppError(404, "Schedules not founded for this user!");
    }

    await schedulesFounded.forEach((schedule) => {
        schedulesRepository
          .createQueryBuilder()
          .delete()
          .where({
            id: schedule.id,
          })
          .execute();
      });

      return { message: "Schedules deleted!" };

}