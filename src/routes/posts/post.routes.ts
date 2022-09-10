import { Router } from "express"
import { createPostController } from "../../controllers/posts.controller"
import authenticationMiddleware from "../../middlewares/authentication.middleware"
import isAdmMiddleware from "../../middlewares/isAdm.middleware"

const routes = Router()

const postRoutes = () => {
    routes.post("/:area_id", authenticationMiddleware, isAdmMiddleware ,createPostController)

    return routes
}

export default postRoutes