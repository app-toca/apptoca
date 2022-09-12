import AppDataSource from "../../data-source";
import { Image } from "../../entities/Image.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Organizations } from "../../entities/Organizations.entity";
import { Posts } from "../../entities/Posts.entity";
import { AppError } from "../../error/global";
import { IPostRequest } from "../../interfaces/posts";

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

  const p = await postsRepository.findOneBy({
    id: post_id,
  });

  let nP: IPost;

  nP = p!;

  delete nP.user?.age;
  delete nP.user?.year;
  delete nP.user?.course;
  delete nP.user?.phrase;
  delete nP.user?.is_adm;
  delete nP.user?.is_owner;
  delete nP.user?.is_active;
  delete nP.user?.created_at;
  delete nP.user?.updated_at;
  delete nP.user?.organization;
  delete nP.user?.email;
  delete nP.user?.meetings;
  delete nP.area?.description;
  delete nP.area?.organization;
  delete nP.area?.meetings;
  nP.comments?.map((p) => {
    delete p.user?.age &&
      delete p.user?.year &&
      delete p.user?.course &&
      delete p.user?.phrase &&
      delete p.user?.is_adm &&
      delete p.user?.is_owner &&
      delete p.user?.is_active &&
      delete p.user?.created_at &&
      delete p.user?.updated_at &&
      delete p.user?.organization;
  });

  return nP;
};

export default updatePostService;
