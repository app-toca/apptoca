import { Comments } from "../../entities/Comments.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";
import { UpdateResult } from "typeorm";
import { Organizations } from "../../entities/Organizations.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Image } from "../../entities/Image.entity";

interface IComment {
  id: string;
  content: string;
  user: IUserResponse;
}

interface IUserResponse {
  id: string;
  name?: string;
  email?: string;
  nickname?: string;
  age?: number;
  year?: number;
  course?: string;
  phrase?: string;
  is_adm?: boolean;
  is_owner?: boolean;
  img?: Image;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  organization?: Organizations;
  meetings?: Meetings[];
}

const updateCommentService = async (
  comment_id: string,
  id: string,
  content: string
): Promise<IComment> => {
  const commentsRepository = AppDataSource.getRepository(Comments);
  const comment = await commentsRepository.findOne({
    where: { id: comment_id },
  });

  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  if (comment.user.id !== id) {
    throw new AppError(401, "This comment doesn't belogn to this user");
  }

  try {
    const updatedComment = await commentsRepository.update(comment_id, {
      content: content,
    });
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  const c = await commentsRepository.findOne({
    where: { id: comment_id },
  });

  let com: IComment;

  com = c!;

  delete com.user.name;
  delete com.user.nickname;
  delete com.user.age;
  delete com.user.year;
  delete com.user.course;
  delete com.user.phrase;
  delete com.user.is_adm;
  delete com.user.is_owner;
  delete com.user.is_active;
  delete com.user.created_at;
  delete com.user.updated_at;
  delete com.user.organization;
  delete com.user.email;
  delete com.user.meetings;
  delete com.user.img;

  return com;
};
export default updateCommentService;
