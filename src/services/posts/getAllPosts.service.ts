import AppDataSource from "../../data-source";
import { Posts } from "../../entities/Posts.entity";
import { desconstructUser, desconstructArea } from "../../util/desconstruct";

const getAllPostsService = async (organization: string) => {
  const postsRepository = AppDataSource.getRepository(Posts);

  const posts = await postsRepository.find({
    where: { area: { organization: { id: organization } } },
  });

  const postArray = posts.map((post) => {
    const user = desconstructUser(post.user);
    const area = desconstructArea(post.area);
    return { ...post, user, area };
  });

  return postArray;
};

export default getAllPostsService;
