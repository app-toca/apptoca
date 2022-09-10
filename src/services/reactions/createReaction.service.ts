import AppDataSource from "../../data-source"
import { Posts } from "../../entities/Posts.entity"
import { Reaction } from "../../entities/Reactions.entity"
import { User } from "../../entities/User.entity"
import { AppError } from "../../error/global"
import { IReactionReponse, IReactionRequest } from "../../interfaces/reactions"



const createReactionService = async ({type}: IReactionRequest, post_id: string,user_id:string) : Promise<IReactionReponse> => {

    const postsRepository = await AppDataSource.getRepository(Posts)
    const usersRepository = await AppDataSource.getRepository(User)
    const reactionsRepository = await AppDataSource.getRepository(Reaction)
    
    
    const user = await usersRepository.findOneBy({
        id: user_id
    })
    
    if(!user) {
        throw new AppError(404, "User not found")
        
    }
    
    const post = await postsRepository.findOneBy({
        id: post_id
    })
    
    
    if(!post) {
        throw new AppError(404, "Post not found")

    }


    if(!type) {
        throw new AppError(400, "You need to pass the type of the reaction")
    }

    const newReaction = new Reaction()

    newReaction.user = user!
    newReaction.post = post!
    newReaction.type = type

    await reactionsRepository.create(newReaction)

    const newPostCreated = await reactionsRepository.save(newReaction)

    return newPostCreated

} 



export default createReactionService 