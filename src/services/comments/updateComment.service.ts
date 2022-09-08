import { Comments } from "../../entities/Comments.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";

const updateCommentService = async (
  comment_id: string,
  user_id: string,
  content: string
): Promise<Comments> => {
  const commentsRepository = AppDataSource.getRepository(Comments);
  const comment = await commentsRepository.findOne({
    where: { id: comment_id },
  });

  if (!comment) {
    throw new AppError(404, "Comment not found");
  }
  if (comment.user.id !== user_id) {
    throw new AppError(400, "This comment doesn't belogn to this user");
  }

  comment.content = content;

  let updatedComment: Comments | null;

  try {
    updatedComment = await commentsRepository.save(comment);
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  return updatedComment;
};
export default updateCommentService;
