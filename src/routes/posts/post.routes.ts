import { Router } from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getOnePostController,
  getPostsByAreaController,
  updatePostController,
} from "../../controllers/posts.controller";
import authenticationMiddleware from "../../middlewares/authentication.middleware";
import checkOrganizationMiddleware from "../../middlewares/checkOrganization.middleware";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";

const routes = Router();

const postRoutes = () => {
  routes.post(
    "/:area_id",
    authenticationMiddleware,
    isAdmMiddleware,
    createPostController
  );
  routes.get(
    "",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    getAllPostsController
  );
  routes.get("/:post_id", authenticationMiddleware, getOnePostController);
  routes.get(
    "/areas/:area_id",
    authenticationMiddleware,
    checkOrganizationMiddleware,
    getPostsByAreaController
  );
  routes.patch(
    "/:post_id",
    authenticationMiddleware,
    isAdmMiddleware,
    updatePostController
  );
  routes.delete(
    "/:post_id",
    authenticationMiddleware,
    isAdmMiddleware,
    deletePostController
  );

  return routes;
};

export default postRoutes;
