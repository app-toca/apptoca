import AppDataSource from "../../data-source"
import { User } from "../../entities/User.entity"
import { AppError } from "../../error/global"
import { IEmailRequest } from "../../interfaces/email"
import { sendEmail } from "../../util/nodemail.util"
import jwt from "jsonwebtoken";



const forgotPasswordService = async (email: string, url: string) => {

    const usersRepository = AppDataSource.getRepository(User)

    const user = await usersRepository.findOneBy({
        email: email
    })

    if(!user) {

        throw new AppError(404, "User not found")
    }


    const token = jwt.sign(
        {
          id: user.id
        },
        process.env.SECRET_KEY!,
        { expiresIn: "1h" }
    );

    

    try {

        const body = {subject: '', text: `<!DOCTYPE html>
        <html>
        
        <head>
            <title>Forget Password Email</title>
        </head>
        
        <body>
            <div>
                <h3>Dear ${user.name},</h3>
                <p>You requested for a password reset, kindly use this <a href=${url}/${email}/${token}>link</a> to reset your password. This link will expires in 1 hour</p>
                <br>
                <img src="https://res.cloudinary.com/drcattrj1/image/upload/v1662898012/105918-forgot-password_gmssgp.gif"/>
                <p>Cheers!</p>
            </div>
           
        </body>
        
        </html>`, to: email}

        const {subject, text, to}: IEmailRequest = body
        
        await sendEmail({subject, text, to})
        return {
            message: 'Email sended with success!'
        }
    } catch (error) {
        if(error instanceof Error){
            throw new AppError(400, error.message)
        }
    }
}

export default forgotPasswordService