import AppDataSource from "../../data-source"
import { Reaction } from "../../entities/Reactions.entity"
import { AppError } from "../../error/global"

import { IReactionRequest } from "../../interfaces/reactions"


const updateReactionService = async (reaction_id: string, user_id: string, changes: IReactionRequest) => {

    const reactionsRepository = AppDataSource.getRepository(Reaction)


    const reaction = await reactionsRepository.findOneBy({
        id: reaction_id
    })

    if(!reaction) {

        throw new AppError(404, "Reaction not found")
    }

    if(reaction.user.id !== user_id) {
        throw new AppError(403, "You don't have permission to change this reaction")
    }

    if(!changes.type) {
        throw new AppError(400, "You need to pass the new type of this reaction")
    }

    if(Object.keys(changes).length > 1) {
        throw new AppError(400, "You only can change the type of this reaction")
    }

    await reactionsRepository.update(reaction_id, changes)

    return {...reaction, ...changes}

}


export default updateReactionService 