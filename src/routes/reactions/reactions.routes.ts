import { Router } from "express"
import { createReactionController, deleteReactionController, getReactionsOfPostController, updateReactionController } from "../../controllers/reactions.controller"
import authenticationMiddleware from "../../middlewares/authentication.middleware"

const routes = Router()

const reactionRoutes = () => {
    routes.post("/:post_id", authenticationMiddleware, createReactionController)
    routes.get("/:post_id", authenticationMiddleware, getReactionsOfPostController)
    routes.patch("/:reaction_id", authenticationMiddleware, updateReactionController)
    routes.delete("/:reaction_id", authenticationMiddleware, deleteReactionController)

    return routes
}

export default reactionRoutes