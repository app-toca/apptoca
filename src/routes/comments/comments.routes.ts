import { Express } from "express";
import {
  listUserCommentsController,
  listPostCommentsController,
  createPostCommentController,
  updateCommentController,
  deleteCommentController,
} from "../../controllers/comments.controllers";

export const areasRoutes = (app: Express) => {
  app.get("/comments/:user_id", listUserCommentsController);
  app.get("/comments/:post_id", listPostCommentsController);
  app.post("/comments/:post_id", createPostCommentController);
  app.patch("/comments/:comment_id", updateCommentController);
  app.delete("/comments/:comment_id", deleteCommentController);
};
