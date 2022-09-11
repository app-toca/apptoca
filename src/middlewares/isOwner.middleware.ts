import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/global";

const isOwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { is_owner } = req.user;

  if (!is_owner) {
    throw new AppError(401, "Unauthorizated");
  }

  next();
};

export default isOwnerMiddleware;
