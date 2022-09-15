import AppDataSource from "../../data-source";
import { Image } from "../../entities/Image.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Organizations } from "../../entities/Organizations.entity";
import { Posts } from "../../entities/Posts.entity";
import { AppError } from "../../error/global";
import { IPostRequest } from "../../interfaces/posts";
import { desconstructArea, desconstructUser } from "../../util/desconstruct";

interface IPost {
  user?: IUserR;
  area?: IArea;
  content?: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  comments?: ICom[];
}

interface ICom {
  id?: string;
  content?: string;
  user?: IUserR;
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

const updatePostService = async (
  post_id: string,
  user_id: string,
  changes: IPostRequest
) => {
  const postsRepository = AppDataSource.getRepository(Posts);

  const post = await postsRepository.findOneBy({
    id: post_id,
  });

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  if (post.user.id !== user_id) {
    throw new AppError(403, "You don't have permission to change this post");
  }

  if (!changes.content) {
    throw new AppError(400, "You need to pass the new content of this post");
  }

  if (Object.keys(changes).length > 1) {
    throw new AppError(400, "You only can change the content of this post");
  }

  await postsRepository.update(post_id, changes);

  const postChanged = await postsRepository.findOneBy({
    id: post_id,
  });

  const user = desconstructUser(postChanged!.user)
  const area = desconstructArea(postChanged!.area)
  return { ...postChanged,user, area}

};

export default updatePostService;
