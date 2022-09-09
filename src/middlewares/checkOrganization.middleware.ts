import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Areas } from "../entities/Areas.entity";
import { Comments } from "../entities/Comments.entity";
import { Meetings } from "../entities/Meetings.entity";
import { Posts } from "../entities/Posts.entity";
import { User } from "../entities/User.entity";

const checkOrganizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { organization } = req.user;
  const { user_id, area_id, post_id, meeting_id, comment_id } = req.params;

  const userRepository = AppDataSource.getRepository(User);
  const areaRepository = AppDataSource.getRepository(Areas);
  const postRepository = AppDataSource.getRepository(Posts);
  const meetingRepository = AppDataSource.getRepository(Meetings);
  const commentRepository = AppDataSource.getRepository(Comments);

  if (user_id) {
    const user = await userRepository.findOneBy({ id: user_id });

    if (user?.organization.id !== organization) {
      return res.status(403).json({
        message: "Você não tem permissão",
      });
    }
  }

  if (area_id) {
    const area = await areaRepository.findOneBy({ id: area_id });

    if (area?.organization_id !== organization) {
      return res.status(403).json({
        message: "Você não tem permissão",
      });
    }
  }

  if (post_id) {
    const post = await postRepository.findOneBy({ id: post_id });

    if (post?.area.organization_id !== organization) {
      return res.status(403).json({
        message: "Você não tem permissão",
      });
    }
  }

  if (meeting_id) {
    const meeting = await meetingRepository.findOneBy({ id: meeting_id });

    if (meeting?.area.organization_id !== organization) {
      return res.status(403).json({
        message: "Você não tem permissão",
      });
    }
  }

  if (comment_id) {
    const comment = await commentRepository.findOneBy({ id: comment_id });

    if (comment?.post.area.organization_id !== organization) {
      return res.status(403).json({
        message: "Você não tem permissão",
      });
    }
  }

  if (!organization) {
    return res.status(403).json({
      message: "Você não tem permissão",
    });
  }

  next();
};

export default checkOrganizationMiddleware;
