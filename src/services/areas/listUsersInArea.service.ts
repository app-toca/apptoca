import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
const listUsersInAreaService = async (area_id: string): Promise<User[]> => {
    const areaRepository = await AppDataSource.getRepository(Areas)
    const usersRepository = await AppDataSource.getRepository(User)

    const area = await areaRepository.findOneBy({
      id: area_id
  })

  if(!area) {
      throw new AppError(404, "Area not found")

  }

  const users = usersRepository.find({
    relations: {
      area_user:true
    },
    where: {
      area_user: {
        area: area
      } 
    }

  })

  return users


};

export default listUsersInAreaService;
