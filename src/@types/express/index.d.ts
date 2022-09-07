import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        is_adm: boolean;
        is_owner: boolean;
        id: string;
        organization: string;
      };
    }
  }
}
