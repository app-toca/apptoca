import { iCommentRequest } from "../../interfaces/comments";
import AppDataSource from "../../data-source";
import { Comments } from "../../entities/Comments.entity";
import { Posts } from "../../entities/Posts.entity";
import { AppError } from "../../error/global";
import { User } from "../../entities/User.entity";

interface ICom {
  user?: any;
  post?: any;
  area?: any;
  id: string;
  content: string;
  comments?: any;
}

const createPostCommentService = async ({
  id,
  post_id,
  content,
}: iCommentRequest) => {
  const usersRepository = AppDataSource.getRepository(User);
  const commentsRepository = AppDataSource.getRepository(Comments);
  const postsRepository = AppDataSource.getRepository(Posts);

  const post: Posts | null = await postsRepository.findOne({
    where: { id: post_id },
  });

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  const user: User | null = await usersRepository.findOne({
    where: { id: id },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const newComment = new Comments();
  newComment.user = user;
  newComment.post = post;
  newComment.content = content;

  let createdComment: Comments | null;

  try {
    createdComment = await commentsRepository.save(newComment);
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }

  let nCom: ICom;

  nCom = createdComment;

  delete nCom.user;
  delete nCom.post;
  delete nCom.comments;
  delete nCom.area;
  nCom.user = user.id;
  nCom.post = post.id;
  nCom.area = post.area.name;

  return nCom;
};
export default createPostCommentService;
