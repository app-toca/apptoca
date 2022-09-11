import AppDataSource from "../../data-source";
import { Comments } from "../../entities/Comments.entity";
import { Posts } from "../../entities/Posts.entity";
import { AppError } from "../../error/global";
import { Organizations } from "../../entities/Organizations.entity";
import { Meetings } from "../../entities/Meetings.entity";

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
  is_active?: boolean;
  img?: string;
  created_at?: Date;
  updated_at?: Date;
  organization?: Organizations;
  meetings?: Meetings[];
}

const listPostCommentService = async (post_id: string): Promise<IComment[]> => {
  const postsRepository = AppDataSource.getRepository(Posts);

  const post = await postsRepository.findOneBy({ id: post_id });

  if (!post) {
    throw new AppError(404, "Comments not found");
  }
  let com: IComment[];

  com = post!.comments;

  com.map(
    (c) =>
      delete c.user.name &&
      delete c.user.nickname &&
      delete c.user.age &&
      delete c.user.year &&
      delete c.user.course &&
      delete c.user.phrase &&
      delete c.user.is_adm &&
      delete c.user.is_owner &&
      delete c.user.is_active &&
      delete c.user.img &&
      delete c.user.created_at &&
      delete c.user.updated_at &&
      delete c.user.organization &&
      delete c.user.email &&
      delete c.user.meetings
  );

  return com;
};
export default listPostCommentService;
