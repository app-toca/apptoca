import AppDataSource from "../../data-source"
import { Posts } from "../../entities/Posts.entity"
import { Reaction } from "../../entities/Reactions.entity"
import { AppError } from "../../error/global"



const getReactionsOfPostService = async (post_id: string) => {

    const postsRepository = AppDataSource.getRepository(Posts)
    const reactionsRepository = AppDataSource.getRepository(Reaction)

    const post = postsRepository.findOneBy({
        id: post_id
    })

    if(!post) {

        throw new AppError(404, "Post not found")
    }

    const reactions = await reactionsRepository.find({
        where: {
            post: {
                id: post_id
            }
        }, relations: {
            post: true
        }

    })

    return reactions

}

export default getReactionsOfPostService