import AppDataSource from "../../data-source";
import { Image } from "../../entities/Image.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../error/global";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


const uploadImageService = async (image: any, user_id: string) => {

const imagesRepository = AppDataSource.getRepository(Image)
const usersRepository = AppDataSource.getRepository(User);


  const user = await usersRepository.findOneBy({
    id: user_id,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const imageUser = await imagesRepository.findOneBy({
    id: user.img.id
  })

  if(!imageUser) {
    throw new AppError(404, "Error");
  }

  const uploaded = await cloudinary.uploader.upload(image!.path, (error:any, result:any) =>  result);
    fs.unlink(image!.path, (error) => {
        if(error){
            console.log(error)
        }
    })

  
  const changed = await imagesRepository.update(imageUser.id, {url: uploaded.url} )
  
  return uploaded;

}

export default uploadImageService