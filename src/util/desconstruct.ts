import { Areas } from "../entities/Areas.entity";
import { User } from "../entities/User.entity";

export const desconstructUser = (userReq: User) => {
  const { id, name, nickname } = userReq;
  const user = { id, name, nickname };
  return user;
};

export const desconstructArea = (areaReq: Areas) => {
  const { id, name } = areaReq;
  const area = { id, name };
  return area;
};
