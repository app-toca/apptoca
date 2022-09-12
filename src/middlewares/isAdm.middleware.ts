import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/global";

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { is_adm } = req.user;

  if (!is_adm) {
    throw new AppError(401, "Unauthorized");
  }

  next();
};

export default isAdmMiddleware;
