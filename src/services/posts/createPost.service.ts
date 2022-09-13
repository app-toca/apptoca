import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Posts } from "../../entities/Posts.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { IPostRequest } from "../../interfaces/posts";
import { Organizations } from "../../entities/Organizations.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Image } from "../../entities/Image.entity";

interface IPost {
  user?: IUserR;
  area?: IArea;
  content?: string;
  id?: string;
  created_at?: Date;
  updated_at?: Date;
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

const createPostService = async (
  { content }: IPostRequest,
  area_id: string,
  user_id: string
) => {
  const postsRepository = await AppDataSource.getRepository(Posts);
  const areaRepository = await AppDataSource.getRepository(Areas);
  const usersRepository = await AppDataSource.getRepository(User);

  const user = await usersRepository.findOneBy({
    id: user_id,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const area = await areaRepository.findOneBy({
    id: area_id,
  });

  if (!area) {
    throw new AppError(404, "Area not found");
  }

  const newPost = new Posts();

  newPost.user = user!;
  newPost.area = area!;
  newPost.content = content;

  await postsRepository.create(newPost);
  const newPostCreated = await postsRepository.save(newPost);

  let nP: IPost;

  nP = newPostCreated!;

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

  return nP;
};

export default createPostService;
