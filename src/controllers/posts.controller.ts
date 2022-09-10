import { Request, Response } from 'express'
import createPostService from "../services/posts/createPost.service"


export const createPostController  = async(req: Request, res: Response) => {

    const { area_id } = req.params 

    const post = await createPostService(req.body, area_id ,req.user.id)

    return res.status(201).json(post)

}