import { Posts } from "../../entities/Posts.entity"
import { User } from "../../entities/User.entity"


export interface IReactionRequest {
    type: string
}

export interface IReactionReponse extends IReactionRequest {
    id: string
    created_at: Date
    updated_at: Date
    user: User
    post: Posts

}