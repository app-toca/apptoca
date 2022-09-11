import AppDataSource from "../../data-source"
import { Posts } from "../../entities/Posts.entity"


const getAllPostsService = async () => {

    const postsRepository = AppDataSource.getRepository(Posts)

    const posts = await postsRepository.find()

    return posts 

}

export default getAllPostsService