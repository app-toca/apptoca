import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token invalido",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: "Token invalido",
        });
      }

      req.user = {
        is_adm: decoded.is_adm,
        is_owner: decoded.is_owner,
        id: decoded.sub,
        organization: decoded.organization,
      };

      next();
    }
  );
};

export default authenticationMiddleware;