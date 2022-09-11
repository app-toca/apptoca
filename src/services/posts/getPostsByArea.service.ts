import AppDataSource from "../../data-source"
import { Areas } from "../../entities/Areas.entity"
import { Posts } from "../../entities/Posts.entity"
import { AppError } from "../../error/global"


const getPostsByAreaService = async (area_id: string) => {

    const postsRepository = AppDataSource.getRepository(Posts)
    const areasRepository = AppDataSource.getRepository(Areas)

    const area = areasRepository.findOneBy({
        id: area_id
    })

    if(!area) {

        throw new AppError(404, "Area not found")
    }

    const posts = await postsRepository.find({
        where: {
            area: {
                id: area_id
            }
        }, relations: {
            area: true
        }
        
    })

    return posts

}

export default getPostsByAreaService