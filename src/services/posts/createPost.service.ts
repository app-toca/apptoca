import AppDataSource from "../../data-source"
import { Areas } from "../../entities/Areas.entity"
import { Posts } from "../../entities/Posts.entity"
import { User } from "../../entities/User.entity"
import { AppError } from "../../error/global"
import { IPostRequest } from "../../interfaces/posts"


const createPostService = async ({content}: IPostRequest, area_id: string,user_id:string) => {

    const postsRepository = await AppDataSource.getRepository(Posts)
    const areaRepository = await AppDataSource.getRepository(Areas)
    const usersRepository = await AppDataSource.getRepository(User)


    const user = await usersRepository.findOneBy({
        id: user_id
    })

    if(!user) {
        throw new AppError(404, "User not found")

    }

    const area = await areaRepository.findOneBy({
        id: area_id
    })

    if(!area) {
        throw new AppError(404, "Area not found")

    }

    const newPost = new Posts()

    newPost.user = user!
    newPost.area = area!
    newPost.content = content
    

    await postsRepository.create(newPost)
    const newPostCreated = await postsRepository.save(newPost)

    return newPostCreated

}

export default createPostService