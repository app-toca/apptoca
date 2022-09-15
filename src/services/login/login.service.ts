import { User } from "../../entities/User.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../error/global";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async (email: string, password: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const u: User | null = await usersRepository.findOne({
    where: { email: email },
  });

  if (!u) {
    throw new AppError(403, "Incorrect email or password");
  }

  const passwordMatch = await bcrypt.compare(password, u.password);

  if (!passwordMatch) {
    throw new AppError(403, "Incorrect email or password");
  }

  const token = jwt.sign(
    {
      is_adm: u.is_adm,
      is_owner: u.is_owner,
      id: u.id,
      organization: u.organization.id,
    },
    process.env.SECRET_KEY!,
    { expiresIn: "24h" }
  );

  const desconstruct = (a: User) => {
    const { organization, schedule, meetings, password, ...rest } = a;

    return { ...rest };
  };

  const user = desconstruct(u);

  return { user, token };
};

export default loginService;
