import AppDataSource from "../../data-source"
import { Posts } from "../../entities/Posts.entity"
import { AppError } from "../../error/global"
import { IPostRequest } from "../../interfaces/posts"


const updatePostService = async (post_id: string, user_id: string, changes: IPostRequest) => {

    const postsRepository = AppDataSource.getRepository(Posts)
    

    const post = await postsRepository.findOneBy({
        id: post_id
    })

    if(!post) {

        throw new AppError(404, "Post not found")
    }

    if(post.user.id !== user_id) {
        throw new AppError(403, "You don't have permission to change this post")
    }

    if(!changes.content) {
        throw new AppError(400, "You need to pass the new content of this post")
    }

    if(Object.keys(changes).length > 1) {
        throw new AppError(400, "You only can change the content of this post")
    }

    await postsRepository.update(post_id, changes)

    return {...post, ...changes}

}

export default updatePostService