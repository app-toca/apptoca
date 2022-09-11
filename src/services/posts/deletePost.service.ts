import AppDataSource from "../../data-source"
import { Posts } from "../../entities/Posts.entity"
import { AppError } from "../../error/global"


const deletePostService = async (post_id: string, user_id: string) => {

    const postsRepository = AppDataSource.getRepository(Posts)
    

    const post = await postsRepository.findOneBy({
        id: post_id
    })

    if(!post) {

        throw new AppError(404, "Post not found")
    }

    if(post.user.id !== user_id) {
        throw new AppError(403, "You don't have permission to delete this post")
    }


    const deleted = await postsRepository.remove(post)

    return deleted

}

export default deletePostService