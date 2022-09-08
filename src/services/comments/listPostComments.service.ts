import AppDataSource from "../../data-source";
import { Comments } from "../../entities/Comments.entity";
import { Posts } from "../../entities/Posts.entity";
import { AppError } from "../../error/global";

const listPostCommentService = async (post_id: string): Promise<Comments[]> => {
  const commentsRepository = AppDataSource.getRepository(Comments);
  const comments: Comments[] | null = await commentsRepository.find({
    relations: { post: true },
    where: { id: post_id },
  });
  if (!comments) {
    throw new AppError(404, "Comments not found");
  }
  return comments;
};
export default listPostCommentService;
