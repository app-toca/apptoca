import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";
import { Comments } from "../../entities/Comments.entity";

const listUserCommentsService = async (user_id: string) => {
  const commentsRepository = AppDataSource.getRepository(Comments);
  const comments: Comments[] | null = await commentsRepository.find({
    relations: { user: true },
    where: { id: user_id },
  });

  if (!comments) {
    throw new AppError(404, "Comments not found");
  }

  return comments;
};
export default listUserCommentsService;
