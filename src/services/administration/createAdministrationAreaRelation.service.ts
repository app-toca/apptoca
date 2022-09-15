import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Area_users } from "../../entities/Area_users.entity";
import { Image } from "../../entities/Image.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Organizations } from "../../entities/Organizations.entity";
import { Schedules } from "../../entities/Schedules.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { IAdministrationAreaRequest } from "../../interfaces/administration";
import { desconstructUser } from "../../util/desconstruct";

interface IUserR {
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

interface IArea {
  id: string;
  name?: string;
  description?: string;
  organization?: Organizations;
  meetings?: Meetings[];
}

interface IRes {
  user?: IUserR;
  area?: IArea;
  id?: string;
}

const createAdministrationAreaRelationService = async ({
  user_id,
  area_id,
}: IAdministrationAreaRequest) => {
  const areaUsersRepository = await AppDataSource.getRepository(Area_users);
  const areaRepository = await AppDataSource.getRepository(Areas);
  const usersRepository = await AppDataSource.getRepository(User);

  const u = await usersRepository.findOneBy({
    id: user_id,
  });

  if (!u) {
    throw new AppError(404, "User not found");
  }

  const a = await areaRepository.findOneBy({
    id: area_id,
  });

  if (!a) {
    throw new AppError(404, "Area not found");
  }

  const relation = await areaUsersRepository.find({
    where: { user: { id: user_id}, area: { id: area_id }}
  })

  if(relation.length > 0) {
    throw new AppError(400, "Relation already exists")
  }

  const areaUsers = new Area_users();

  areaUsers.user = u!;
  areaUsers.area = a!;

  await areaUsersRepository.create(areaUsers);
  const areaUsersCreated = await areaUsersRepository.save(areaUsers);


  return {message: "Relation created with success"};
};

export default createAdministrationAreaRelationService;
