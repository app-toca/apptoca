import { Request, Response } from 'express'
import createAdministrationAreaRelationService from '../services/administration/createAdministrationAreaRelation.service'
import deleteAdministrationAreaRelationService from '../services/administration/deleteAdministrationAreaRelation.service'

export const createAdministrationAreaRelationController = async(req: Request, res: Response) => {

    const areaUsers = await createAdministrationAreaRelationService(req.body)

    return res.status(201).json(areaUsers)

}

export const deleteAdministrationAreaRelationController = async(req: Request, res: Response) => {

    const {area_id, user_id} = req.params

    const deleted = await deleteAdministrationAreaRelationService(area_id, user_id)

    return res.status(200).send(deleted)

}

