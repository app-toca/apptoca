import { Express } from "express";
import {
  listUserCommentsController,
  listPostCommentsController,
  createPostCommentController,
  updateCommentController,
  deleteCommentController,
} from "../../controllers/comments.controllers";
import isAdmMiddleware from "../../middlewares/isAdm.middleware";
import authenticationMiddleware from "../../middlewares/authentication.middleware";

export const areasRoutes = (app: Express) => {
  app.get(
    "/comments/:user_id",
    authenticationMiddleware,
    listUserCommentsController
  );
  app.get(
    "/comments/:post_id",
    authenticationMiddleware,
    listPostCommentsController
  );
  app.post(
    "/comments/:post_id",
    authenticationMiddleware,
    createPostCommentController
  );
  app.patch(
    "/comments/:comment_id",
    authenticationMiddleware,
    updateCommentController
  );
  app.delete(
    "/comments/:comment_id",
    authenticationMiddleware,
    deleteCommentController
  );
};
