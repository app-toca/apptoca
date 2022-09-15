import { Areas } from "../entities/Areas.entity";
import { Posts } from "../entities/Posts.entity";
import { User } from "../entities/User.entity";

export const desconstructUser = (userReq: User) => {
  const { id, name, nickname, img } = userReq;
  const user = { id, name, nickname, img };
  return user;
};

export const desconstructArea = (areaReq: Areas) => {
  const { id, name } = areaReq;
  const area = { id, name };
  return area;
};


export const desconstructPost = (post: Posts) => {
  const userP = desconstructUser(post.user)
  const areaP = desconstructArea(post.area)
  const { user, comments , area, ...rest } = post
  return { user: userP, area: areaP, ...rest }
}
