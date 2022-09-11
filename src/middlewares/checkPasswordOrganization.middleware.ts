import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import AppDataSource from "../data-source";
import { AppError } from "../error/global";
import { Organizations } from "../entities/Organizations.entity";

const checkPasswordOrganizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    
    const organizationsRepository = AppDataSource.getRepository(Organizations)
    const {organization_id, password_org} = req.params
    
    const organizationFinded = await organizationsRepository.findOneBy({ id: organization_id})
    
    if(!organizationFinded) {
        throw new AppError(404, "Organization not found");
    }
    
    if (password_org !== organizationFinded.password) {
        throw new AppError(403, "Incorrect organization password");
    }

  next()
  
};

export default checkPasswordOrganizationMiddleware;