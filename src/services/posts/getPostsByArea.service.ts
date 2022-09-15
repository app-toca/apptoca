import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Comments } from "../../entities/Comments.entity";
import { Image } from "../../entities/Image.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Organizations } from "../../entities/Organizations.entity";
import { Posts } from "../../entities/Posts.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { desconstructArea, desconstructUser } from "../../util/desconstruct";

interface IPost {
  user: User;
  area: Areas;
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

const getPostsByAreaService = async (area_id: string, organization_id: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);
  const areasRepository = AppDataSource.getRepository(Areas);

  const area = await areasRepository.findOneBy({
    id: area_id
  });
  
  if (!area) {
    throw new AppError(404, "Area not found");
  }

  
  if(area.organization && (area.organization.id !== organization_id )) {
    throw new AppError(403, "You don't have access to this area");
  } else if(!area.organization) {
    throw new AppError(403, "This area don't have any organization");
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

  const postByArea = posts.map((post: IPost) => {
    const user = desconstructUser(post.user)
    const area = desconstructArea(post.area)
    return { ...post,user, area}
  });

  return postByArea;
};

export default getPostsByAreaService;
