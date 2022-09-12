import AppDataSource from "../../data-source";
import { Posts } from "../../entities/Posts.entity";

const getAllPostsService = async (organization: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);

  const posts = await postsRepository.find({
    where: { area: { organization: { id: organization } } },
  });

  return posts;
};

export default getAllPostsService;
