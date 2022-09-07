import { NextFunction, Request, Response } from "express";

const isAdmMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { is_adm } = req.user;

  if (!is_adm) {
    return res.status(403).json({
      message: "Você não tem permissão",
    });
  }

  next();
};

export default isAdmMiddleware;
