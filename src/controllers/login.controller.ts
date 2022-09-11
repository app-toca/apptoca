import loginService from "../services/login/login.service";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import forgotPasswordService from "../services/login/forgotPassword.service";
import changePasswordService from "../services/login/changePassword.service";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await loginService(email, password);
  return res.status(200).json(instanceToPlain(token));
};

export const forgotPasswordController = async (req: Request, res: Response) => {
  const { url } = req.body;
  const { email } = req.params
  const sended = await forgotPasswordService(email, url);
  return res.status(200).json(sended);
};

export const changePasswordController = async (req: Request, res: Response) => {

  const { email } = req.params
  const { newPassword } = req.body
  const token = req.headers.authorization
  
  const changed = await changePasswordService(email, token, newPassword)

  return res.status(200).json(changed);


}




