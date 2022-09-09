import { Router } from "express";
import {
  listUserCommentsController,
  listPostCommentsController,
  createPostCommentController,
  updateCommentController,
  deleteCommentController,
} from "../../controllers/comments.controllers";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";
import authenticationMiddleware from "../../middlewares/authentication.middleware";

const routes = Router();

export const commentsRoutes = () => {
  routes.get(
    "/:user_id",
    authenticationMiddleware,
    listUserCommentsController
  );
  routes.get(
    "/:post_id",
    authenticationMiddleware,
    listPostCommentsController
  );
  routes.post(
    "/:post_id",
    authenticationMiddleware,
    createPostCommentController
  );
  routes.patch(
    "/:comment_id",
    authenticationMiddleware,
    updateCommentController
  );
  routes.delete(
    "/:comment_id",
    authenticationMiddleware,
    deleteCommentController
  );

  return routes;
};
