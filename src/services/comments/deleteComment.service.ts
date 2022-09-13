import { DeleteResult } from "typeorm";
import AppDataSource from "../../data-source";
import { Comments } from "../../entities/Comments.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

const deleteCommentService = async (
  comment_id: string,
  id: string
): Promise<DeleteResult> => {
  const commentsRepository = AppDataSource.getRepository(Comments);
  const usersRepo = AppDataSource.getRepository(User);
  const comment = await commentsRepository.findOne({
    where: { id: comment_id },
  });
  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  const user = await usersRepo.findOneBy({ id: id });

  if (comment.user.id !== id && user?.is_adm === false) {
    throw new AppError(
      401,
      "This comment doesn't belogn to this user, and you're not adimin"
    );
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
