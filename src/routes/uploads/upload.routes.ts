import { Router } from "express";
import { uploadImageController } from "../../controllers/uploads.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import upload from "../../middlewares/multer.middleware";


const routes = Router()

const uploadRoutes = () => {

    routes.post("/image", authenticationMiddleware, upload.single('image'), uploadImageController)

    return routes
}

export default uploadRoutes