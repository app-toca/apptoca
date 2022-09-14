import { Request, Response } from "express";
import uploadImageService from "../services/uploads/uploadImage.service";


export const uploadImageController = async (req: Request, res: Response) => {
    const { id } = req.user;

    const newImage = await uploadImageService(req.file, id);
  
    return res.status(201).json({url:newImage.url});
  };