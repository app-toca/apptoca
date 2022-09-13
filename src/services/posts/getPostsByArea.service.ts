import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Comments } from "../../entities/Comments.entity";
import { Image } from "../../entities/Image.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Organizations } from "../../entities/Organizations.entity";
import { Posts } from "../../entities/Posts.entity";
import { AppError } from "../../error/global";

interface IPost {
  user?: IUserR;
  area?: IArea;
  content?: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  comments?: Comments[];
}

interface IArea {
  id: string;
  name?: string;
  description?: string;
  organization?: Organizations;
  meetings?: Meetings[];
}

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

const getPostsByAreaService = async (area_id: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);
  const areasRepository = AppDataSource.getRepository(Areas);

  const area = areasRepository.findOneBy({
    id: area_id,
  });

  if (!area) {
    throw new AppError(404, "Area not found");
  }

  const posts = await postsRepository.find({
    where: {
      area: {
        id: area_id,
      },
    },
    relations: {
      area: true,
    },
  });

  let p: IPost[];

  p = posts!;

  p.map((nP: IPost) => {
    delete nP.user?.age &&
      delete nP.user?.year &&
      delete nP.user?.course &&
      delete nP.user?.phrase &&
      delete nP.user?.is_adm &&
      delete nP.user?.is_owner &&
      delete nP.user?.is_active &&
      delete nP.user?.created_at &&
      delete nP.user?.updated_at &&
      delete nP.user?.organization &&
      delete nP.user?.email &&
      delete nP.user?.meetings &&
      delete nP.area?.description &&
      delete nP.area?.organization &&
      delete nP.comments &&
      delete nP.area?.meetings;
  });

  return p;
};

export default getPostsByAreaService;
