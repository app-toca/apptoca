import { DeleteResult } from "typeorm";
import AppDataSource from "../../data-source";
import { Comments } from "../../entities/Comments.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";

const deleteCommentService = async (
  comment_id: string,
  id: string
): Promise<void> => {
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
      "This comment doesn't belong to this user, and you're not adm"
    );
  }
   await commentsRepository.remove(comment);
 
};
export default deleteCommentService;
