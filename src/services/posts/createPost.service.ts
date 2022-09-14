import AppDataSource from "../../data-source";
import { Areas } from "../../entities/Areas.entity";
import { Posts } from "../../entities/Posts.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { IPostRequest } from "../../interfaces/posts";

const createPostService = async (
  { content }: IPostRequest,
  area_id: string,
  user_id: string
) => {
  const postsRepository = await AppDataSource.getRepository(Posts);
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

  const newPost = new Posts();

  newPost.user = u!;
  newPost.area = a!;
  newPost.content = content;

  await postsRepository.create(newPost);
  const newPostCreated = await postsRepository.save(newPost);

  const desconstructArea = (a: Areas) => {
    const { id, name } = a;
    const area = { id, name };
    return area;
  };
  const desconstruct = (p: Posts) => {
    const { user, area, ...rest } = p;
    const userContent = descontructUser(user);
    const areaContent = desconstructArea(area);
    return { userContent, areaContent, ...rest };
  };

  const descontructUser = (us: User) => {
    const { id, name, nickname, ...aa } = us;
    const user = { id, name, nickname };
    return user;
  };

  const post = desconstruct(newPostCreated);
  return post;
};

export default createPostService;
