import AppDataSource from "../../data-source"
import { User } from "../../entities/User.entity"
import { AppError } from "../../error/global"
import jwt from "jsonwebtoken";
import * as bycrypt from "bcryptjs";
import { IEmailRequest } from "../../interfaces/email";
import { sendEmail } from "../../util/nodemail.util";



const changePasswordService = async (email:string, token: string | undefined, newPassword: string) => {
    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({
        email: email
    })

    if(!user) {

        throw new AppError(404, "User not found")
    }

  if (!token) {
    throw new AppError(401, "Invalid token")
  }

  const payload = token.split(" ")[1];

  jwt.verify(
    payload,
    process.env.SECRET_KEY as string,
    async(error: any, decoded: any) => {
      if (error) {
        throw new AppError(401, "Invalid token")
      }

      if(user.id !== decoded.id) {

        throw new AppError(403, "You don't have permission to change the password of this user")

      }

    }
  );

  const hashedPassword = await bycrypt.hash(newPassword, 10);

  await usersRepository.update(user.id, {password: hashedPassword})

  try {

    const body = {subject: '', text: `<!DOCTYPE html>
    <html>
    
    <head>
        <title>Password Reset</title>
    </head>
    
    <body>
        <div>
            <h3>Dear ${user.name},</h3>
            <p>Your password has been successful reset, you can now login with your new password.</p>
            <br>
            <img src="https://res.cloudinary.com/drcattrj1/image/upload/v1662898020/61026-password_zjpz5a.gif"/>
            <div>
                Cheers!
            </div>
        </div>
       
    </body>
    
    </html>`, to: email}

    const {subject, text, to}: IEmailRequest = body
    
    await sendEmail({subject, text, to})

} catch (error) {
    if(error instanceof Error){
        throw new AppError(400, error.message)
    }
}

  /*-----*/

  return {message: "Password changed with success"}
}

export default changePasswordService