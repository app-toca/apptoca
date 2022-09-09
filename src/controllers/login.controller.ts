import loginService from "../services/login/login.service";
import { Request, Response } from "express";

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await loginService(email, password);
  return res.status(200).json(token);
};
export { loginController };
