import AppDataSource from "../../data-source"
import { Reaction } from "../../entities/Reactions.entity"
import { AppError } from "../../error/global"


const deleteReactionService = async (reaction_id: string, user_id: string) => {

    const reactionsRepository = AppDataSource.getRepository(Reaction)


    const reaction = await reactionsRepository.findOneBy({
        id: reaction_id
    })

    if(!reaction) {

        throw new AppError(404, "Reaction not found")
    }

    if(reaction.user.id !== user_id) {
        throw new AppError(403, "You don't have permission to delete this reaction")
    }
    
    const deleted = await reactionsRepository.remove(reaction)

    return deleted

}


export default deleteReactionService 