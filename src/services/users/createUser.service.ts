import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users";
import * as bycrypt from "bcryptjs";

export const createUserService = async (
  {
    name,
    nickname,
    email,
    age,
    password,
    year,
    course,
    phrase,
    isAdm,
    img,
  }: IUserRequest,
  organizationId: string
) => {
  const usersRepository = AppDataSource.getRepository(User);

  const hashedPassword = await bycrypt.hash(password, 10);

  const newUser = usersRepository.create({
    name,
    nickname,
    email,
    age,
    password: hashedPassword,
    year,
    course,
    phrase,
    img,
    organization: { id: organizationId },
  });

  await usersRepository.save(newUser);

  return newUser;
};
