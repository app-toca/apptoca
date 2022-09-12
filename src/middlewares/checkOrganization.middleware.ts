import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Areas } from "../entities/Areas.entity";
import { Comments } from "../entities/Comments.entity";
import { Meetings } from "../entities/Meetings.entity";
import { Organizations } from "../entities/Organizations.entity";
import { Posts } from "../entities/Posts.entity";
import { User } from "../entities/User.entity";
import { AppError } from "../error/global";

const checkOrganizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { organization } = req.user;
  const { user_id, area_id, post_id, meeting_id, comment_id, org_id } =
    req.params;
  const userRepository = AppDataSource.getRepository(User);
  const areaRepository = AppDataSource.getRepository(Areas);
  const postRepository = AppDataSource.getRepository(Posts);
  const meetingRepository = AppDataSource.getRepository(Meetings);
  const commentRepository = AppDataSource.getRepository(Comments);
  const orgRepository = AppDataSource.getRepository(Organizations);

  if (user_id) {
    const user = await userRepository.findOneBy({ id: user_id });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (user?.organization.id !== organization) {
      throw new AppError(401, "Unauthorizated");
    }
  }

  if (org_id) {
    const org = await orgRepository.findOneBy({ id: org_id });
    if (org_id !== organization) {
      throw new AppError(401, "Unauthorizated");
    }
  }

  if (area_id) {
    const area = await areaRepository.findOneBy({ id: area_id });
    if (area?.organization.id !== organization) {
      throw new AppError(401, "Unauthorizated");
    }
  }
  if (post_id) {
    const post = await postRepository.findOneBy({ id: post_id });
    if (post?.area.organization.id !== organization) {
      throw new AppError(401, "Unauthorizated");
    }
  }

  if (meeting_id) {
    const meeting = await meetingRepository.findOne({
      relations: { area: { organization: true } },
      where: { id: meeting_id, area: { organization: { id: organization } } },
    });
    if (!meeting) {
      throw new AppError(401, "Unauthorizated");
    }
  }

  if (comment_id) {
    const comment = await commentRepository.findOneBy({ id: comment_id });
    if (comment?.post.area.organization.id !== organization) {
      throw new AppError(401, "Unauthorizated");
    }
  }
  if (!organization) {
    throw new AppError(401, "Unauthorizated");
  }

  next();
};

export default checkOrganizationMiddleware;
