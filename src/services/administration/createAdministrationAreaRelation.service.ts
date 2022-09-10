import AppDataSource from "../../data-source"
import { Areas } from "../../entities/Areas.entity"
import { Area_users } from "../../entities/Area_users.entity"
import { User } from "../../entities/User.entity"
import { AppError } from "../../error/global"
import { IAdministrationAreaRequest } from "../../interfaces/administration"


const createAdministrationAreaRelationService = async({user_id, area_id}: IAdministrationAreaRequest ) => {

    const areaUsersRepository = await AppDataSource.getRepository(Area_users)
    const areaRepository = await AppDataSource.getRepository(Areas)
    const usersRepository = await AppDataSource.getRepository(User)


    const user = await usersRepository.findOneBy({
        id: user_id
    })

    if(!user) {
        throw new AppError(404, "User not found")

    }

    const area = await areaRepository.findOneBy({
        id: area_id
    })

    if(!area) {
        throw new AppError(404, "Area not found")

    }

    const areaUsers = new Area_users()

    areaUsers.user = user!
    areaUsers.area = area!
    

    await areaUsersRepository.create(areaUsers)
    const areaUsersCreated = await areaUsersRepository.save(areaUsers)

    return areaUsersCreated


}

export default createAdministrationAreaRelationService