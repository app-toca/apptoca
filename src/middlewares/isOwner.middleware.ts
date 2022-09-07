import { NextFunction, Request, Response } from "express";

const isOwnerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { is_owner } = req.user;

  if (!is_owner) {
    return res.status(403).json({
      message: "Você não tem permissão",
    });
  }

  next();
};

export default isOwnerMiddleware;
