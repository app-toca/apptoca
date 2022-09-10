import AppDataSource from "../../data-source"
import { Posts } from "../../entities/Posts.entity"
import { AppError } from "../../error/global"


const getOnePostService = async (post_id: string) => {

    const postsRepository = AppDataSource.getRepository(Posts)

    const post = await postsRepository.findOneBy({
        id: post_id
    })

    if(!post) {

        throw new AppError(404, "Post not found")
    }

    return post

}

export default getOnePostService