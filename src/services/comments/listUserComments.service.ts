import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";
import { Comments } from "../../entities/Comments.entity";
import { User } from "../../entities/User.entity";
import { Organizations } from "../../entities/Organizations.entity";
import { Meetings } from "../../entities/Meetings.entity";
import { Image } from "../../entities/Image.entity";
import { desconstructPost, desconstructUser } from "../../util/desconstruct";

interface IComment {
  id: string;
  content: string;
  user: IUserResponse;
}

export interface IUserResponse {
  id: string;
  name?: string;
  email?: string;
  nickname?: string;
  age?: number;
  year?: number;
  course?: string;
  phrase?: string;
  is_adm?: boolean;
  img?: Image;
  is_owner?: boolean;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  organization?: Organizations;
  meetings?: Meetings[];
}

const listUserCommentsService = async (
  user_id: string
): Promise<IComment[]> => {
  const commentsRepository = AppDataSource.getRepository(Comments);
  const userRepository = AppDataSource.getRepository(User)

  const users = await userRepository.find()

  const user = users.find(u => u.id === user_id)

  if(!user) {
    throw new AppError(404, "User not found")
  }

  const comments = await commentsRepository.find({
    where: { user: { id: user_id } },
    relations: { user: true, post: true} 
  });

  if (comments.length == 0) {
    throw new AppError(404, "Comments not found");
  }

  const cleanComments = comments.map(

    (comment) => {
      const userC = desconstructUser(comment.user)
      const postC = desconstructPost(comment.post)
    
      return {...comment, user: userC, post: postC};
    }
  );

  return cleanComments;

  
};
export default listUserCommentsService;
