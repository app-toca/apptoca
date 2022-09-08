import { DeleteResult } from "typeorm";
import AppDataSource from "../../data-source";
import { Comments } from "../../entities/Comments.entity";
import { AppError } from "../../error/global";

const deleteCommentService = async (
  comment_id: string,
  user_id: string
): Promise<DeleteResult> => {
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

  let deletedComment: DeleteResult | null;

  try {
    deletedComment = await commentsRepository.delete(comment);
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  return deletedComment;
};
export default deleteCommentService;
