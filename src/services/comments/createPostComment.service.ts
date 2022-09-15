import { iCommentRequest } from "../../interfaces/comments";
import AppDataSource from "../../data-source";
import { Comments } from "../../entities/Comments.entity";
import { Posts } from "../../entities/Posts.entity";
import { AppError } from "../../error/global";
import { User } from "../../entities/User.entity";
import { Areas } from "../../entities/Areas.entity";
import { Area_users } from "../../entities/Area_users.entity";
import { desconstructArea, desconstructPost, desconstructUser } from "../../util/desconstruct";

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
  const areasRepository = AppDataSource.getRepository(Area_users);

  const posts = await postsRepository.find()

  const post = posts.find(pos => pos.id === post_id)

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  const user: User | null = await usersRepository.findOne({
    where: { id: id },
    relations: {area_user: { area:true}}
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if(user.organization.id !== post.area.organization.id) {
    throw new AppError(403, "You don't have access to this post");
  }


  const areaUser = await areasRepository.find({
    relations: { user: true, area:true },
    where: { user: { id: id }, area: {id: post.area.id} },
  });

  const areaPost = areaUser.find(ar => ar.area.id == post.area.id)

  if(!areaPost && !user?.is_owner) {
    throw new AppError(401, "You don't have access to this area post");
  }

  const newComment = new Comments();
  newComment.user = user;
  newComment.post = post;
  newComment.content = content;

  try {
    await commentsRepository.save(newComment);
  } catch (error: any) {
    throw new AppError(error.statusCode, error.message);
  }


  const comment = newComment
  const userC = desconstructUser(comment.user)
  const postC = desconstructPost(comment.post)

  return {...comment, user: userC, post: postC};
};
export default createPostCommentService;
