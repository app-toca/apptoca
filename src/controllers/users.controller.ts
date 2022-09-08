import { Request, Response } from "express";
import { getAllUsersService } from "../services/users/getAllUsers.service";
import { getOneUserService } from "../services/users/getOneUser.service";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { patchUserService } from "../services/users/userPatch.service";

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsersService();

  return res.status(200).send(users);
};

export const getOneUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const oneUserFind = await getOneUserService(id);

  return res.status(200).send(oneUserFind);
};

export const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const { organization_id, password_org } = req.params;

  const newUser = createUserService(user, organization_id);

  return res.status(201).send(newUser);
};

export const deleteuserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteUserService(id);

  return res.status(204).send({ message: "User Deleted" });
};

export const patchUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await patchUserService(id, req.body);

  return res.status(200).send("User updated");
};
