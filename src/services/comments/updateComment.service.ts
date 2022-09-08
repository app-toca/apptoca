import { Comments } from "../../entities/Comments.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";
import { UpdateResult } from "typeorm";

const updateCommentService = async (
  comment_id: string,
  user_id: string,
  content: string
): Promise<UpdateResult> => {
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

  let updatedComment: UpdateResult | null;

  try {
    updatedComment = await commentsRepository.update(comment_id, {
      content: content,
    });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  return updatedComment;
};
export default updateCommentService;
