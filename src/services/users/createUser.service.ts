import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { IUserRequest } from "../../interfaces/users";
import * as bycrypt from "bcryptjs";
import { Organizations } from "../../entities/Organizations.entity";
import { AppError } from "../../error/global";

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
    img,
  }: IUserRequest,
  organizationId: string,
  password_org: string
) => {
  const usersRepository = AppDataSource.getRepository(User);
  const organizationRepository = AppDataSource.getRepository(Organizations);

  const findEmail = await usersRepository.findOneBy({
    email: email,
  });

  if (findEmail) {
    throw new AppError(400, "User Already Exists");
  }

  const organizationFind = await organizationRepository.findOneBy({
    id: organizationId,
  });

  if (!organizationFind) {
    throw new AppError(404, "Invalid Id");
  } else if (organizationFind?.password !== password_org) {
    throw new AppError(401, "Invalid Password");
  }

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
    organization: organizationFind,
  });

  const usersByOrganization = await usersRepository.find({
    where: {


      organization: organizationFind,
    },
  });



  if (usersByOrganization.length === 0) {
    newUser.is_owner = true;
    newUser.is_adm = true;
  }

  await usersRepository.save(newUser);

  return newUser;
}; 
