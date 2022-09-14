import { Request, Response } from "express";
import { getAllUsersService } from "../services/users/getAllUsers.service";
import { getOneUserService } from "../services/users/getOneUser.service";
import { IUserRequest } from "../interfaces/users";
import { createUserService } from "../services/users/createUser.service";
import { deleteUserService } from "../services/users/deleteUser.service";
import { patchUserService } from "../services/users/userPatch.service";
import { instanceToPlain } from "class-transformer";
import { areasUserService } from "../services/users/areasUser.service";

export const getAllUsersController = async (req: Request, res: Response) => {
  const users = await getAllUsersService();

  return res.status(200).send(instanceToPlain(users));
};

export const getOneUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const oneUserFind = await getOneUserService(id);

  return res.status(200).send(instanceToPlain(oneUserFind));
};

export const createUserController = async (req: Request, res: Response) => {
  const user: IUserRequest = req.body;
  const { organization_id, password_org } = req.params;

  const newUser = await createUserService(user, organization_id, password_org);

  return res.status(201).send(instanceToPlain(newUser));
};

export const deleteuserController = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { id, is_adm } = req.user;

  await deleteUserService(user_id, is_adm, id);

  return res.status(204).send({ message: "User Deleted" });
};

export const patchUserController = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { id, is_owner } = req.user;

  const change = await patchUserService(user_id, req.body, id, is_owner);

  return res
    .status(200)
    .json(instanceToPlain({ user: change, message: "User updated" }));
};

export const areasUserController = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { id, is_adm } = req.user;

  const areaUser = await areasUserService(user_id, is_adm, id);

  res.status(200).send(areaUser);
};
